"use client";

import { use, useEffect, useRef, useState } from "react";

import Link from "next/link";

import { ArrowLeft, Download, Edit2, Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

// <-- Add this import
import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useProjects } from "@/hooks/useProjects";
import { apiClient } from "@/lib/api";
import { Project } from "@/lib/api";

export interface TrailerData {
  [key: string]: unknown;
  projectName: string;
  primaryColor: string;
  assets: {
    screenshotUrl: string;
    voiceoverUrl?: string; // <-- ADD THIS LINE
  };
  scenes: Array<{
    script: string;
    animationStyle: string;
    boundingBox: { x: number; y: number; width: number; height: number };
  }>;
}

interface ProjectStatus {
  status: "processing" | "completed" | "failed";
  progress: number;
  current_stage: string;
}

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>; // <-- Wrap the object in a Promise
}

export default function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const [trailerData, setTrailerData] = useState<TrailerData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [script, setScript] = useState("");
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [statusData, setStatusData] = useState<ProjectStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const terminalLogs = [
    "Initializing Virtual Cinematographer...",
    "Booting headless Chromium instance...",
    "Allocating high-res viewport (1920x1080)...",
    "Navigating to live URL...",
    "Awaiting DOM hydration and network idle...",
    "Capturing visual UI state as Base64 buffer...",
    "Transmitting payload to Gemini AI Director...",
    "Analyzing visual layout and UI hierarchy...",
    "Extracting primary brand color signatures...",
    "Calculating programmatic 3D zoom coordinates...",
    "Writing punchy promotional script...",
    "Compiling Remotion frame math...",
    "Finalizing cinematic Apple-style transitions...",
    "Rendering complete.",
  ];

  const { updateProjectScript } = useProjects();
  // --- 1. First useEffect: Fetches project and polls status ---
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

  // --- 2. Second useEffect: Fetches mock video data when complete ---
  useEffect(() => {
    const fetchVideoData = async () => {
      if (statusData?.status === "completed" && !trailerData) {
        try {
          const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectName: projectData?.name || "Mock Project",
              repoUrl: projectData?.repo_url || "", // <-- ADDED THIS
              liveUrl: projectData?.live_url || "", // <-- ADDED THIS
            }),
          });
          const data = await res.json();

          if (data.success) {
            setTrailerData(data.data);
            // Combine the script object into a readable string for the editor
            setScript(
              data.data.scenes
                .map((s: { script: string }) => s.script)
                .join(" ")
            );
          }
        } catch (error) {
          console.error("Failed to fetch mock video data", error);
        }
      }
    };

    fetchVideoData();
  }, [statusData?.status, trailerData, projectData?.name]);

  // --- 3. Terminal Theater Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (statusData?.status === "processing") {
      interval = setInterval(() => {
        setCurrentLogIndex((prev) =>
          prev < terminalLogs.length - 1 ? prev + 1 : prev
        );
      }, 1200); // Reveal a new log roughly every 1.2 seconds
    }
    return () => clearInterval(interval);
  }, [statusData?.status, terminalLogs.length]);

  // --- 4. Auto-Scroll Effect ---
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentLogIndex]);

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
                {statusData?.status === "processing" ? (
                  <div className="bg-secondary flex aspect-video items-center justify-center rounded-lg">
                    <div className="text-center">
                      <Loader2 className="text-accent mx-auto mb-4 h-12 w-12 animate-spin" />
                      <p className="text-muted-foreground">
                        Rendering video...
                      </p>
                    </div>
                  </div>
                ) : (
                  <VideoPlayer inputProps={trailerData || {}} />
                )}
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
              {/* Status & Terminal Theater */}
              <Card className="overflow-hidden border-white/10 bg-black/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ring-1 ring-white/5 backdrop-blur-2xl">
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 p-4">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <h3 className="text-muted-foreground ml-2 font-mono text-xs tracking-wider uppercase">
                    System Log
                  </h3>
                </div>

                <div className="space-y-6 p-6">
                  {statusData && (
                    <div>
                      <div className="mb-2 flex justify-between">
                        <p className="font-mono text-xs tracking-widest text-cyan-400/80 uppercase">
                          {statusData.current_stage}
                        </p>
                        <p className="font-mono text-xs text-cyan-400/80">
                          {statusData.progress || 0}%
                        </p>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full border border-white/5 bg-black/50">
                        <div
                          className="h-full bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-500 ease-out"
                          style={{ width: `${statusData.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* The Glass Terminal */}
                  <div
                    ref={terminalRef}
                    className="h-48 space-y-2 overflow-y-auto scroll-smooth pr-2 pb-2 font-mono text-[11px] text-cyan-300/70 sm:text-xs [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent"
                  >
                    {terminalLogs
                      .slice(0, currentLogIndex + 1)
                      .map((log, i) => (
                        <div
                          key={i}
                          className="animate-in fade-in slide-in-from-bottom-1 flex gap-3 opacity-90"
                        >
                          <span className="shrink-0 text-cyan-600/50">{`>`}</span>
                          <span className="leading-relaxed">{log}</span>
                        </div>
                      ))}

                    {/* Blinking Cursor */}
                    {statusData?.status === "processing" && (
                      <div className="mt-2 flex gap-3">
                        <span className="shrink-0 text-cyan-600/50">{`>`}</span>
                        <span className="inline-block h-3.5 w-2 animate-pulse rounded-sm bg-cyan-300/70"></span>
                      </div>
                    )}
                  </div>
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
