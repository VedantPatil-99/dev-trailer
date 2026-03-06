"use client";

import {
  ArrowRightIcon,
  FileTextIcon,
  GithubLogoIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function FloatingNav() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-6 left-1/2 z-50 w-fit -translate-x-1/2"
    >
      <div className="group relative flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-black/60">
        {/* Inner glow effect */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-emerald-500/0 via-cyan-500/10 to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Navigation items */}
        <div className="relative flex items-center gap-1 px-2">
          <a
            href="#features"
            className="group/item flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <FileTextIcon size={16} />
            <span className="hidden sm:inline">Features</span>
          </a>

          <a
            href="#demo"
            className="group/item flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <PlayIcon size={16} />
            <span className="hidden sm:inline">Demo</span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group/item flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <GithubLogoIcon size={16} weight="duotone" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* CTA Button */}
          <div className="ml-1 border-l border-white/10" />
          <a
            href="#cta"
            className="group/cta relative ml-1 flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500/80 to-cyan-500/80 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-emerald-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Start Free
            <ArrowRightIcon
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover/cta:translate-x-1"
            />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
