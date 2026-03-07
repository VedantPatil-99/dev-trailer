"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md text-center text-sm">
            A critical error occurred. Please refresh the page or try again
            later.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
            aria-label="Try again"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
