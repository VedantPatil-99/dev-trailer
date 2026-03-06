"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowLeft, Download, Edit2, Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/useProjects";
import { apiClient } from "@/lib/api";
import { Project } from "@/lib/api";

interface ProjectStatus {
  status: "processing" | "completed" | "failed";
  progress: number;
  current_stage: string;
}

interface ProjectDetailsPageProps {
  params: { id: string };
}

export default function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [script, setScript] = useState("");
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [statusData, setStatusData] = useState<ProjectStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const projectId = params.id;
  const { updateProjectScript } = useProjects();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);

        // Fetch project details
        const projectRes = await apiClient.getProject(projectId);
        const data = projectRes.data;
        setProjectData(data);
        setScript(data.script || "");

        // Fetch status
        const statusRes = await apiClient.getProjectStatus(projectId);
        setStatusData(statusRes.data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        toast.error("Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();

    // Poll for status updates every 5 seconds
    const interval = setInterval(async () => {
      try {
        const statusRes = await apiClient.getProjectStatus(projectId);
        setStatusData(statusRes.data);
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [projectId]);

  const handleSaveScript = async () => {
    try {
      setIsSaving(true);
      await updateProjectScript(projectId, script);
      setIsEditing(false);
      toast.success("Script saved");
    } catch (error) {
      console.error("Failed to save script:", error);
      toast.error("Failed to save script");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Loader2 className="text-accent mx-auto mb-4 h-12 w-12 animate-spin" />
            <p className="text-muted-foreground">Loading project...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="bg-background flex min-h-screen">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Project not found</p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{projectData.name}</h1>
                <p className="text-muted-foreground mt-1">
                  {projectData.repo_url}
                </p>
              </div>
              <div className="flex gap-2">
                {statusData?.status === "completed" && (
                  <>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Video Player */}
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold">Video Preview</h2>
                <div className="bg-secondary flex aspect-video items-center justify-center rounded-lg">
                  {statusData?.status === "processing" ? (
                    <div className="text-center">
                      <Loader2 className="text-accent mx-auto mb-4 h-12 w-12 animate-spin" />
                      <p className="text-muted-foreground">
                        Rendering video...
                      </p>
                    </div>
                  ) : (
                    <div className="text-6xl">🎬</div>
                  )}
                </div>
              </Card>

              {/* Script Editor */}
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Video Script</h2>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isSaving}
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={isSaving}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleSaveScript}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="bg-input min-h-64"
                    placeholder="Edit your video script..."
                  />
                ) : (
                  <div className="bg-secondary text-muted-foreground rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                    {script}
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card className="p-6">
                <h3 className="mb-4 font-bold">Processing Status</h3>
                <div className="space-y-4">
                  {statusData && (
                    <>
                      <div>
                        <p className="text-muted-foreground mb-2 text-sm">
                          Progress
                        </p>
                        <div className="bg-secondary h-2 w-full rounded-full">
                          <div
                            className="bg-accent h-2 rounded-full transition-all"
                            style={{ width: `${statusData.progress || 0}%` }}
                          />
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {statusData.progress || 0}%
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground text-sm">
                          Current Stage
                        </p>
                        <p className="mt-1 font-medium">
                          {statusData.current_stage}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Project Info */}
              <Card className="p-6">
                <h3 className="mb-4 font-bold">Project Details</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-muted-foreground text-xs">Duration</dt>
                    <dd className="font-medium">{projectData.duration}s</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Created</dt>
                    <dd className="font-medium">
                      {new Date(projectData.created_at).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Status</dt>
                    <dd className="capitalize">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                          projectData.status === "processing"
                            ? "bg-blue-500/20 text-blue-400"
                            : projectData.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {projectData.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
