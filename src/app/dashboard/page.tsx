"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Plus, Zap } from "lucide-react";

import NewProjectForm from "@/components/dashboard/new-project-form";
import Sidebar from "@/components/dashboard/sidebar";
import VideoGrid from "@/components/dashboard/video-grid";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";

interface NewProjectData {
  projectName: string;
  repoUrl: string;
  description?: string;
  videoDuration: string;
}
export default function Dashboard() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { projects, createProject, isLoading } = useProjects();

  useEffect(() => {
    // Fetch projects on mount
    // In production, would fetch from API
  }, []);

  const handleCreateProject = async (data: NewProjectData) => {
    try {
      const result = await createProject({
        project_name: data.projectName,
        repo_url: data.repoUrl,
        description: data.description,
        video_duration: data.videoDuration,
      });

      setIsFormOpen(false);

      // Redirect to project details
      if (result?.project_id) {
        router.push(`/dashboard/projects/${result.project_id}`);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  // Format projects for display
  const displayVideos = projects.map((project) => ({
    id: project.project_id,
    title: "Launch Video",
    projectName: project.name,
    status: project.status as "processing" | "completed" | "failed",
    createdAt: project.created_at,
    duration: "60s",
  }));

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here are your recent videos.
                </p>
              </div>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Video
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="border-border bg-card rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">Videos Created</p>
              <p className="mt-1 text-2xl font-bold">3</p>
            </div>
            <div className="border-border bg-card rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">Processing</p>
              <p className="mt-1 text-2xl font-bold">1</p>
            </div>
            <div className="border-border bg-card rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">
                Free Tier Remaining
              </p>
              <p className="mt-1 text-2xl font-bold">0/3</p>
            </div>
          </div>

          {/* Upgrade banner */}
          <div className="border-accent/30 bg-accent/5 mb-8 flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Zap className="text-accent h-5 w-5" />
              <div>
                <p className="font-medium">Upgrade to Pro</p>
                <p className="text-muted-foreground text-sm">
                  Unlimited videos and advanced features
                </p>
              </div>
            </div>
            <Button variant="outline">Upgrade</Button>
          </div>

          {/* Video Grid */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Recent Videos</h2>
            {isLoading ? (
              <div className="text-muted-foreground py-8 text-center">
                Loading videos...
              </div>
            ) : (
              <VideoGrid videos={displayVideos} />
            )}
          </div>
        </div>
      </main>

      {/* Create Project Dialog */}
      <NewProjectForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
