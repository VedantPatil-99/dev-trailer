"use client";

import { useState } from "react";

import { Check, Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SocialPostsData {
  linkedin: string;
  x: string;
  instagram: string;
}

interface SocialPostsCardProps {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  script: string;
}

const PLATFORMS = [
  { key: "linkedin" as const, label: "LinkedIn", maxLength: 3000 },
  { key: "x" as const, label: "X (Twitter)", maxLength: 280 },
  { key: "instagram" as const, label: "Instagram", maxLength: 2200 },
] as const;

export function SocialPostsCard({
  projectName,
  repoUrl,
  liveUrl,
  script,
}: SocialPostsCardProps) {
  const [posts, setPosts] = useState<SocialPostsData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPosts(null);
    try {
      const res = await fetch("/api/social-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          repoUrl: repoUrl || "",
          liveUrl: liveUrl || "",
          script,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Failed to generate captions");
        return;
      }
      if (json.success && json.data) {
        setPosts(json.data);
        toast.success("Social captions ready");
      }
    } catch {
      toast.error("Failed to generate captions");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (key: keyof SocialPostsData, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleKeyDownCopy = (
    e: React.KeyboardEvent,
    key: keyof SocialPostsData,
    text: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopy(key, text);
    }
  };

  return (
    <Card className="border-white/5 bg-black/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.24)] ring-1 ring-white/5 backdrop-blur-xl">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Share2 className="text-muted-foreground h-5 w-5" aria-hidden />
            Social captions
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            disabled={isGenerating || !script?.trim()}
            onClick={handleGenerate}
            aria-label="Generate LinkedIn, X and Instagram captions"
            className="border-white/10 bg-white/5 hover:bg-white/10"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Generating...
              </>
            ) : (
              "Generate captions"
            )}
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          AI-generated posts from your video script and project links. Copy and
          paste to LinkedIn, X or Instagram.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        {!posts ? (
          <div className="text-muted-foreground rounded-lg border border-dashed border-white/10 bg-white/5 py-10 text-center text-sm">
            {isGenerating
              ? "Creating captions..."
              : "Click “Generate captions” to create LinkedIn, X and Instagram posts from your trailer."}
          </div>
        ) : (
          <TooltipProvider delayDuration={300}>
            <div className="space-y-4">
              {PLATFORMS.map(({ key, label, maxLength }) => {
                const text = posts[key];
                const isCopied = copiedKey === key;
                return (
                  <div
                    key={key}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.07]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
                        {label}
                      </span>
                      {key === "x" && (
                        <span className="text-muted-foreground text-xs">
                          {text.length} / {maxLength}
                        </span>
                      )}
                    </div>
                    <Textarea
                      readOnly
                      value={text}
                      className="min-h-[80px] resize-none border-white/5 bg-black/30 font-sans text-sm focus-visible:ring-2 focus-visible:ring-white/20"
                      aria-label={`${label} caption`}
                    />
                    <div className="mt-3 flex justify-end">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            tabIndex={0}
                            aria-label={`Copy ${label} caption`}
                            onClick={() => handleCopy(key, text)}
                            onKeyDown={(e) => handleKeyDownCopy(e, key, text)}
                            className="text-muted-foreground hover:text-foreground h-8 gap-1.5"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-4 w-4" aria-hidden />
                                Copied
                              </>
                            ) : (
                              "Copy"
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          Copy to clipboard
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </div>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
}
