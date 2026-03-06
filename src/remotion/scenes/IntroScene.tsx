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

  // Animate the text sliding up and fading in
  const entrance = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [50, 0]);

  // Extract just the first sentence of the AI script for the intro
  const firstSentence =
    script.split(".")[0] || "Introducing our latest project";

  return (
    <AbsoluteFill
      style={{ backgroundColor: theme.background }}
      className="flex items-center justify-center p-24"
    >
      <h1
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          color: "#ffffff", // Always crisp and readable
          textShadow: `0 0 30px ${theme.primary}, 0 0 20px ${theme.primary}`, // Cinematic brand glow!
        }}
        className="text-center text-7xl leading-tight font-bold tracking-tighter"
      >
        {firstSentence}.
      </h1>
    </AbsoluteFill>
  );
};
