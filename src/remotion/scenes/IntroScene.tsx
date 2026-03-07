import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const IntroScene = ({
  script,
  theme,
}: {
  script: string;
  theme: { primary: string; background: string };
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slower entrance animation (5 seconds)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 }, // Original values
  });

  // Gentle pulse effect for visual interest
  const pulse = Math.sin(frame * 0.03) * 0.05 + 1;

  const opacity = interpolate(entrance, [0, 0.2, 0.8, 1], [0, 1, 1, 0.95]);
  const translateY = interpolate(entrance, [0, 1], [60, 0]);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]) * pulse;

  // Extract just the first sentence of the AI script for the intro
  const firstSentence =
    script.split(".")[0] || "Introducing our latest project";

  return (
    <AbsoluteFill
      style={{ backgroundColor: theme.background }}
      className="flex items-center justify-center p-24"
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${theme.primary}40 0%, transparent 70%)`,
        }}
      />

      <h1
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          color: "#ffffff",
          textShadow: `0 0 40px ${theme.primary}, 0 0 30px ${theme.primary}, 0 0 20px ${theme.primary}`,
        }}
        className="relative z-10 text-center text-7xl leading-tight font-bold tracking-tighter"
      >
        {firstSentence}.
      </h1>

      {/* Animated underline */}
      <div
        className="absolute bottom-32 left-1/2 h-1 -translate-x-1/2 transform rounded-full"
        style={{
          width: `${interpolate(entrance, [0, 1], [0, 200])}px`,
          backgroundColor: theme.primary,
          boxShadow: `0 0 20px ${theme.primary}`,
          opacity: interpolate(entrance, [0.5, 1], [0, 1]),
        }}
      />
    </AbsoluteFill>
  );
};
