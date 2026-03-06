"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
          Ready to Create Your Product Video?
        </h2>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg text-balance">
          Join developers worldwide who are using DevTrailer to launch their
          projects. No credit card required—start free today.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Creating Videos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>

        <p className="text-muted-foreground mt-8 text-sm">
          No credit card required. Free tier includes 3 videos per month.
        </p>
      </div>
    </section>
  );
}
