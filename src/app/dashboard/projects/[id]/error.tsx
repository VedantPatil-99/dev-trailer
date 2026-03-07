"use client";

import { useEffect } from "react";

import Link from "next/link";

import { AlertCircle } from "lucide-react";

import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Project detail error:", error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="text-destructive flex items-center gap-3">
          <AlertCircle className="h-10 w-10" aria-hidden />
          <h1 className="text-xl font-bold">Could not load project</h1>
        </div>
        <p className="text-muted-foreground max-w-md text-center text-sm">
          Something went wrong loading this project. You can try again or go
          back to your videos.
        </p>
        <div className="flex gap-3">
          <Button onClick={reset} variant="outline" aria-label="Try again">
            Try again
          </Button>
          <Button asChild>
            <Link href="/dashboard/projects">My videos</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
