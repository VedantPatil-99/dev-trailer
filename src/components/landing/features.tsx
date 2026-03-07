"use client";

import {
  ArrowRight,
  Clock,
  Code,
  Gear,
  GitBranch,
  Lightning,
  Sparkle,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: GitBranch,

    title: "Connect GitHub",

    description:
      "Paste your repository link and let DevTrailer parse your README and repo structure.",
  },

  {
    icon: Sparkle,

    title: "AI Script Generation",

    description:
      "Advanced AI analyzes your project and generates engaging, professional scripts.",
  },

  {
    icon: Code,

    title: "UI Capture",

    description:
      "Automatically screenshot and analyze your application interface for visual demonstrations.",
  },

  {
    icon: Lightning,

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
    icon: Gear,

    title: "Fully Customizable",

    description:
      "Edit scripts, adjust timing, and fine-tune every aspect before rendering.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 py-24 sm:py-32"
    >
      {/* Background decoration */}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],

            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,

            repeat: Infinity,

            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Powerful Features
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80"
            >
              Everything you need to create professional product videos without
              complexity.
            </motion.p>
          </motion.div>

          {/* Features grid */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,

                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -10,

                    transition: { duration: 0.2 },
                  }}
                  className="group"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
                    {/* Gradient overlay */}

                    <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

                    {/* Icon container with animation */}

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.5,

                        delay: index * 0.1 + 0.2,
                      }}
                      className="mb-6"
                    >
                      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                        <Icon
                          className="relative z-10 h-8 w-8 text-green-400"
                          weight="fill"
                        />
                      </div>
                    </motion.div>

                    {/* Feature content */}

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,

                        delay: index * 0.1 + 0.3,
                      }}
                    >
                      <h3 className="mb-3 text-xl font-bold text-white transition-all duration-300 group-hover:text-green-400">
                        {feature.title}
                      </h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                          duration: 0.6,

                          delay: index * 0.1 + 0.4,
                        }}
                        className="leading-relaxed text-white/70"
                      >
                        {feature.description}
                      </motion.p>

                      {/* Hover action button */}

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="mt-6"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/70 transition-all duration-300 hover:bg-white/20 hover:text-white"
                        >
                          Learn More
                          <ArrowRight
                            className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            weight="bold"
                          />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
