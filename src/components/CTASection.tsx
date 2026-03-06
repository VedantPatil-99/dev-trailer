"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

export default function CTASection() {
  const features = [
    "No credit card required",
    "Free tier includes 5 videos/month",
    "Production-ready output",
    "Share directly to social media",
  ];

  return (
    <section
      id="cta"
      className="relative min-h-screen w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-screen w-screen -translate-x-1/2 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-gradient-to-l from-cyan-500/15 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="group relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-emerald-500/10 via-black/50 to-cyan-500/10 p-12 backdrop-blur-xl sm:p-16"
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 via-transparent to-cyan-500/50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />

          {/* Content */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready to transform your marketing?
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 text-balance text-4xl font-black tracking-tight sm:text-5xl"
            >
              Create Your First Video in{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-lg opacity-50" />
                <span className="relative bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  60 Seconds
                </span>
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 max-w-2xl text-lg text-white/70"
            >
              No production experience needed. Just paste your documentation and
              live URL, and let AI handle the rest. Export, share, and start
              growing your audience.
            </motion.p>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 space-y-3"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="text-emerald-400"
                    />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              {/* Primary CTA with glow */}
              <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40">
                {/* Animated background shine */}
                <div className="absolute inset-0 -left-full bg-white/20 transition-left duration-500 group-hover:left-full" />

                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight size={18} weight="bold" />
                </span>
              </button>

              {/* Secondary CTA */}
              <button className="group relative inline-flex items-center justify-center gap-2 rounded-xl border-2 border-cyan-500/50 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/20">
                View Pricing
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </motion.div>

            {/* Trust indicator */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-8 text-sm text-white/50"
            >
              Join 5,000+ developers already creating cinematic videos
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
