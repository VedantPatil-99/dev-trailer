"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Microphone,
  FilmSlate,
  Rocket,
  Eye,
  Zap,
} from "@phosphor-icons/react";

interface BentoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  gradient?: string;
}

function BentoCard({
  icon,
  title,
  description,
  className = "col-span-1 row-span-1",
  gradient = "from-emerald-500/20 to-cyan-500/10",
}: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 group-hover:text-cyan-300">
            {icon}
          </div>
        </div>

        <div>
          <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}

export default function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="features"
      className="relative min-h-screen w-full px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-500/10 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-l from-cyan-500/10 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Everything You Need to{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-40" />
              <span className="relative bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Shine
              </span>
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            DevTrailer handles the entire video production pipeline, from AI
            copywriting to final render.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6"
        >
          {/* AI Copywriter - Large card */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
            <BentoCard
              icon={<Sparkles size={24} weight="duotone" />}
              title="AI Copywriter"
              description="Our intelligent system analyzes your documentation and creates compelling marketing scripts that sell your vision."
              gradient="from-emerald-500/30 to-cyan-500/15"
              className="h-full min-h-[300px]"
            />
          </motion.div>

          {/* Virtual Cinematographer */}
          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-3">
            <BentoCard
              icon={<FilmSlate size={24} weight="duotone" />}
              title="Virtual Cinematographer"
              description="Intelligent UI detection and interaction triggers for cinematic footage capture."
              gradient="from-cyan-500/30 to-emerald-500/15"
              className="h-full min-h-[300px]"
            />
          </motion.div>

          {/* Voiceover Generation */}
          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2">
            <BentoCard
              icon={<Microphone size={24} weight="duotone" />}
              title="Pro Voiceover"
              description="Human-quality audio generation with perfect timing."
              className="h-full min-h-[250px]"
            />
          </motion.div>

          {/* Motion Graphics */}
          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2">
            <BentoCard
              icon={<Zap size={24} weight="duotone" />}
              title="Motion Graphics"
              description="Smooth camera moves and transitions for premium feel."
              className="h-full min-h-[250px]"
            />
          </motion.div>

          {/* Fast Assembly */}
          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2">
            <BentoCard
              icon={<Rocket size={24} weight="duotone" />}
              title="Lightning Fast"
              description="From upload to final video in under 60 seconds."
              className="h-full min-h-[250px]"
            />
          </motion.div>

          {/* Analytics & Export */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
            <BentoCard
              icon={<Eye size={24} weight="duotone" />}
              title="Analytics & Export"
              description="Track performance metrics and export in multiple formats for social media, websites, and presentations."
              gradient="from-purple-500/20 to-pink-500/10"
              className="h-full min-h-[250px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
