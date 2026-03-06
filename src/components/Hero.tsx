"use client";

import { PlayIcon } from "@phosphor-icons/react";
import { motion, Variants } from "motion/react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut", // Now correctly recognized as a valid Easing string
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-32">
      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-linear-to-r from-emerald-500/20 to-transparent blur-3xl" />
        <div className="absolute top-40 right-1/4 h-80 w-80 rounded-full bg-linear-to-l from-cyan-500/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 bg-linear-to-t from-emerald-500/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">
              AI-Powered Video Generation
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1 variants={itemVariants} className="max-w-5xl text-balance">
          <span className="block text-6xl tracking-tight sm:text-7xl lg:text-8xl">
            Your Code
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-linear-to-r from-emerald-500 to-cyan-500 opacity-50 blur-xl" />
              <span className="relative bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Deserves Better
              </span>
            </span>
          </span>
          <span className="mt-2 block text-5xl font-black tracking-tight text-white/80 sm:text-6xl lg:text-7xl">
            Marketing
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/60 sm:text-xl"
        >
          Transform your documentation and live website into cinematic promo
          videos in seconds. No editing, no voiceover recording, no creative
          agency needed.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <button className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40">
            <span className="relative z-10 flex items-center gap-2">
              <PlayIcon size={20} />
              Get Started Free
            </span>
            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-emerald-400 to-cyan-400 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          <button className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/5 hover:shadow-lg hover:shadow-cyan-500/20">
            Watch Demo
          </button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 left-10 h-20 w-20 rounded-lg border border-emerald-500/20 bg-emerald-500/5 opacity-30 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute right-10 bottom-40 h-16 w-16 rounded-full border border-cyan-500/20 bg-cyan-500/5 opacity-30 backdrop-blur-sm"
        />
      </motion.div>
    </section>
  );
}
