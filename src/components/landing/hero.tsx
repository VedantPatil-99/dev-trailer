"use client";

import Link from "next/link";

import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          {/* Badge */}
          <div className="bg-secondary mb-6 inline-block rounded-full px-4 py-1 text-sm">
            <span className="text-accent">✨ AI-Powered</span> Video Generation
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-5xl font-bold text-pretty sm:text-6xl lg:text-7xl">
            Turn GitHub Repos into Professional Videos
          </h1>

          {/* Subheading */}
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg text-balance sm:text-xl">
            DevTrailer automatically creates stunning product launch videos from
            your GitHub repositories. No filming, no editing—just paste your
            repo link and let AI do the work.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" /> See Features
              </Button>
            </Link>
          </div>

          {/* Hero image placeholder */}
          <div className="from-accent/10 border-border relative overflow-hidden rounded-2xl border bg-gradient-to-b to-transparent p-1">
            <div className="bg-secondary flex aspect-video items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="mb-4 text-6xl">🎬</div>
                <p className="text-muted-foreground">
                  Professional Launch Videos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
