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
  liveUrl?: string;
  description?: string;
  videoDuration: string;
}
export default function Dashboard() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { projects, createProject, fetchProjects, isLoading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (data: NewProjectData) => {
    try {
      const result = await createProject({
        project_name: data.projectName,
        repo_url: data.repoUrl,
        live_url: data.liveUrl, // <-- Add this line
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
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back. Here are your recent videos.
                </p>
              </div>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent/20 hover:shadow-accent/30 shrink-0 shadow-lg transition-shadow"
                aria-label="Create new video project"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Video
              </Button>
            </div>
          </div>

          {/* Stats — glass cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
              <p className="text-muted-foreground text-sm font-medium">
                Videos Created
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                {projects.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
              <p className="text-muted-foreground text-sm font-medium">
                Processing
              </p>
              <p className="mt-2 text-3xl font-bold text-cyan-400 tabular-nums">
                {projects.filter((p) => p.status === "processing").length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
              <p className="text-muted-foreground text-sm font-medium">
                Free Tier
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums">—</p>
            </div>
          </div>

          {/* Upgrade banner */}
          <div className="border-accent/20 from-accent/10 to-accent/5 mb-8 flex flex-col gap-4 rounded-2xl border bg-gradient-to-r p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-accent/20 flex h-10 w-10 items-center justify-center rounded-xl">
                <Zap className="text-accent h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="font-semibold">Upgrade to Pro</p>
                <p className="text-muted-foreground text-sm">
                  Unlimited videos and advanced features
                </p>
              </div>
            </div>
            <Button variant="outline" className="shrink-0 border-white/20">
              Upgrade
            </Button>
          </div>

          {/* Video Grid */}
          <div>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              Recent Videos
            </h2>
            {isLoading ? (
              <div className="text-muted-foreground flex items-center justify-center rounded-2xl border border-dashed border-white/10 py-16">
                <span className="text-sm">Loading videos…</span>
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
