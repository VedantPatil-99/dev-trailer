import { useCallback, useState } from "react";

import { toast } from "sonner";

import { apiClient } from "@/lib/api";

export interface Project {
  project_id: string;
  name: string;
  status: "processing" | "completed" | "failed";
  repo_url: string;
  created_at: string;
  video_url?: string;
}

interface ProjectStatus {
  project_id: string;
  status: string;
  progress: number;
  current_stage: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.listProjects();
      setProjects(response.data.projects || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch projects";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProject = useCallback(
    async (data: {
      project_name: string;
      repo_url: string;
      live_url?: string; // <-- Add this line
      description?: string;
      video_duration?: string;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.createProject(data);
        const newProject = response.data;
        setProjects((prev) => [newProject, ...prev]);
        toast.success("Project created successfully!");
        return newProject;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create project";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getProjectStatus = useCallback(async (projectId: string) => {
    try {
      const response = await apiClient.getProjectStatus(projectId);
      return response.data as ProjectStatus;
    } catch (err) {
      console.error("Failed to fetch project status:", err);
      return null;
    }
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      await apiClient.deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.project_id !== projectId));
      toast.success("Project deleted");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete project";
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const updateProjectScript = useCallback(
    async (projectId: string, script: string) => {
      try {
        await apiClient.updateProjectScript(projectId, script);
        toast.success("Script updated");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update script";
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
    getProjectStatus,
    deleteProject,
    updateProjectScript,
  };
}
