"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-border bg-secondary/20 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-accent text-accent-foreground flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold">
                D
              </div>
              <span className="font-bold">DevTrailer</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Turn your GitHub repos into professional product launch videos.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © 2026 DevTrailer. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-6 sm:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              GitHub
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
