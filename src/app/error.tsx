"use client";

import { useEffect } from "react";

import Link from "next/link";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="text-destructive flex items-center gap-3">
        <AlertCircle className="h-10 w-10" aria-hidden />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
      </div>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        An unexpected error occurred. You can try again or return home.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" aria-label="Try again">
          Try again
        </Button>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
