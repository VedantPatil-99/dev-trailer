"use client";

import { Clock, Code2, GitBranch, Settings, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Connect GitHub",
    description:
      "Paste your repository link and let DevTrailer parse your README and repo structure.",
  },
  {
    icon: Sparkles,
    title: "AI Script Generation",
    description:
      "Advanced AI analyzes your project and generates engaging, professional scripts.",
  },
  {
    icon: Code2,
    title: "UI Capture",
    description:
      "Automatically screenshot and analyze your application interface for visual demonstrations.",
  },
  {
    icon: Zap,
    title: "Professional Output",
    description:
      "Get polished, cinematic videos ready for YouTube, Twitter, and promotional use.",
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description:
      "Generate complete videos in minutes, not days. Get to market faster.",
  },
  {
    icon: Settings,
    title: "Fully Customizable",
    description:
      "Edit scripts, adjust timing, and fine-tune every aspect before rendering.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Powerful Features
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Everything you need to create professional product videos without
            the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="border-border bg-card hover:bg-card/80 rounded-xl border p-6 transition-colors"
              >
                <div className="bg-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Icon className="text-accent h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
