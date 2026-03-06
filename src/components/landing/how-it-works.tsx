"use client";

const steps = [
  {
    number: "1",
    title: "Paste Your Repo",
    description: "Enter your GitHub repository URL and project details.",
  },
  {
    number: "2",
    title: "AI Analyzes",
    description:
      "DevTrailer analyzes your code, README, and UI to understand your project.",
  },
  {
    number: "3",
    title: "Generate Script",
    description:
      "AI writes a compelling, professional launch script tailored to your product.",
  },
  {
    number: "4",
    title: "Review & Customize",
    description:
      "Edit the script, adjust timing, and refine before video generation.",
  },
  {
    number: "5",
    title: "Render Video",
    description:
      "Our system generates a high-quality video with professional visuals.",
  },
  {
    number: "6",
    title: "Download & Share",
    description: "Get your video in multiple formats and share it everywhere.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">How It Works</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Six simple steps from GitHub to professional video.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex h-full flex-col">
                <div className="bg-accent text-accent-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-muted-foreground flex-1 text-sm">
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="bg-border absolute top-12 -right-4 hidden h-0.5 w-8 lg:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
