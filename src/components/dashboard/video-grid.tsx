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
  onDelete?: (id: string) => void;
}

export default function VideoGrid({ videos, onDelete }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-16 text-center">
        <div className="text-muted-foreground mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-3xl">
          🎬
        </div>
        <p className="text-muted-foreground mb-1 font-medium">No videos yet</p>
        <p className="text-muted-foreground/80 text-sm">
          Create your first video to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <Link key={video.id} href={`/dashboard/projects/${video.id}`}>
          <article
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
            aria-label={`Open ${video.projectName}`}
          >
            {/* Thumbnail */}
            <div className="relative flex aspect-video items-center justify-center bg-linear-to-br from-white/5 to-transparent">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.projectName}
                  className="h-full w-full object-cover"
                  width={400}
                  height={225}
                />
              ) : (
                <div className="text-4xl opacity-80">🎬</div>
              )}

              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl">
                  <Play
                    className="text-background fill-background h-7 w-7 pl-1"
                    aria-hidden
                  />
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${
                    video.status === "completed"
                      ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
                      : video.status === "processing"
                        ? "bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/30"
                        : "bg-red-500/20 text-red-400 ring-1 ring-red-500/30"
                  }`}
                >
                  {video.status === "completed"
                    ? "Done"
                    : video.status === "processing"
                      ? "Processing"
                      : "Failed"}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-foreground truncate font-semibold">
                {video.projectName}
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">
                {video.duration} ·{" "}
                {new Date(video.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div
                onClick={(e) => e.preventDefault()}
                className="mt-3 flex gap-2"
              >
                {video.status === "completed" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Download video"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost" aria-label="More actions">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete?.(video.id);
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
