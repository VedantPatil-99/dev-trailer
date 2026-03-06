"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const projectSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  repoUrl: z
    .string()
    .min(1, "Repository URL is required")
    .refine(
      (val) => val.includes("github.com"),
      "Must be a valid GitHub URL (github.com)"
    ),
  liveUrl: z
    .string()
    .url("Must be a valid URL (e.g., https://myapp.com)")
    .or(z.literal(""))
    .optional(), // <-- Add this line
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),
  videoDuration: z.enum(["30", "60", "90"]),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface NewProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: ProjectFormData) => Promise<void>;
}

export default function NewProjectForm({
  open,
  onOpenChange,
  onSubmit,
}: NewProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      repoUrl: "",
      liveUrl: "",
      description: "",
      videoDuration: "60",
    },
  });

  const onFormSubmit = async (data: ProjectFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      reset();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Video Project</DialogTitle>
          <DialogDescription>
            Paste your GitHub repository link and let DevTrailer create a
            professional video.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              placeholder="e.g., My Awesome App"
              disabled={isSubmitting}
              {...register("projectName")}
              className="bg-input"
            />
            {errors.projectName && (
              <p className="text-destructive text-xs">
                {errors.projectName.message}
              </p>
            )}
          </div>

          {/* Repository URL */}
          <div className="space-y-2">
            <Label htmlFor="repoUrl">GitHub Repository URL *</Label>
            <Input
              id="repoUrl"
              placeholder="https://github.com/username/repo"
              disabled={isSubmitting}
              {...register("repoUrl")}
              className="bg-input"
            />
            {errors.repoUrl && (
              <p className="text-destructive text-xs">
                {errors.repoUrl.message}
              </p>
            )}
          </div>

          {/* Live URL */}
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Website URL (Optional)</Label>
            <Input
              id="liveUrl"
              placeholder="https://your-deployed-app.com"
              disabled={isSubmitting}
              {...register("liveUrl")}
              className="bg-input"
            />
            {errors.liveUrl && (
              <p className="text-destructive text-xs">
                {errors.liveUrl.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any additional context about your project..."
              disabled={isSubmitting}
              {...register("description")}
              className="bg-input resize-none"
              rows={3}
            />
            {errors.description && (
              <p className="text-destructive text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Video Duration */}
          <div className="space-y-2">
            <Label htmlFor="videoDuration">Video Duration</Label>
            <select
              id="videoDuration"
              disabled={isSubmitting}
              {...register("videoDuration")}
              className="bg-input border-border focus:ring-accent w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            >
              <option value="30">30 seconds</option>
              <option value="60">1 minute (Recommended)</option>
              <option value="90">90 seconds</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
