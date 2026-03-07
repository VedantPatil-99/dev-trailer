"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Film, Plus } from "lucide-react";

import NewProjectForm from "@/components/dashboard/new-project-form";
import Sidebar from "@/components/dashboard/sidebar";
import VideoGrid from "@/components/dashboard/video-grid";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";

interface NewProjectData {
  projectName: string;
  repoUrl: string;
  liveUrl?: string;
  description?: string;
  videoDuration: string;
}

export default function MyVideosPage() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { projects, createProject, fetchProjects, isLoading, deleteProject } =
    useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (data: NewProjectData) => {
    try {
      const result = await createProject({
        project_name: data.projectName,
        repo_url: data.repoUrl,
        live_url: data.liveUrl,
        description: data.description,
        video_duration: data.videoDuration,
      });
      setIsFormOpen(false);
      if (result?.project_id) {
        router.push(`/dashboard/projects/${result.project_id}`);
      }
    } catch {
      // Error already handled in useProjects
    }
  };

  const displayVideos = projects.map((project) => ({
    id: project.project_id,
    title: "Launch Video",
    projectName: project.name,
    status: project.status as "processing" | "completed" | "failed",
    createdAt: project.created_at,
    duration: "60s",
    thumbnail: undefined,
  }));

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-3xl font-bold">
                  <Film className="text-accent h-8 w-8" aria-hidden />
                  My Videos
                </h1>
                <p className="text-muted-foreground mt-1">
                  All your video projects in one place
                </p>
              </div>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                aria-label="Create new video project"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Video
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-muted-foreground py-12 text-center">
              Loading your videos...
            </div>
          ) : (
            <VideoGrid
              videos={displayVideos}
              onDelete={(id) => deleteProject(id)}
            />
          )}
        </div>
      </main>

      <NewProjectForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
