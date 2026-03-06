"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-background/80 border-border fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="bg-accent text-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold">
            D
          </div>
          <span className="text-lg font-bold">DevTrailer</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="hover:text-accent text-sm transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-accent text-sm transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="hover:text-accent text-sm transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
