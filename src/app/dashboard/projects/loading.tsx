import { Loader2 } from "lucide-react";

import Sidebar from "@/components/dashboard/sidebar";

export default function MyVideosLoading() {
  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Loader2
            className="text-accent mx-auto mb-4 h-12 w-12 animate-spin"
            aria-hidden
          />
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </main>
    </div>
  );
}
