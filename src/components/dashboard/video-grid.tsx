"use client";

import Image from "next/image";
import Link from "next/link";

import { Download, MoreVertical, Play, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Video {
  id: string;
  title: string;
  projectName: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
  duration: string;
  thumbnail?: string;
}

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground mb-4">
          No videos yet. Create your first one!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Link key={video.id} href={`/dashboard/projects/${video.id}`}>
          <div className="group bg-secondary border-border hover:border-accent relative cursor-pointer overflow-hidden rounded-xl border transition-all">
            {/* Thumbnail */}
            <div className="bg-secondary relative flex aspect-video items-center justify-center">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.projectName}
                  className="h-full w-full object-cover"
                  width={200}
                  height={200}
                />
              ) : (
                <div className="text-4xl">🎬</div>
              )}

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="bg-accent flex h-12 w-12 items-center justify-center rounded-full">
                  <Play className="text-accent-foreground fill-accent-foreground h-6 w-6" />
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute top-2 right-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    video.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : video.status === "processing"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {video.status === "completed"
                    ? "✓ Done"
                    : video.status === "processing"
                      ? "Processing..."
                      : "Failed"}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="truncate text-sm font-bold">
                {video.projectName}
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">
                {video.duration} •{" "}
                {new Date(video.createdAt).toLocaleDateString()}
              </p>

              {/* Actions menu */}
              <div
                onClick={(e) => e.preventDefault()}
                className="mt-3 flex gap-2"
              >
                {video.status === "completed" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      /* Download video */
                    }}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        /* Delete video */
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
