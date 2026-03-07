import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { TextGenerateEffect } from "../components/TextGenerateEffect";

export const ShowcaseScene = ({
  screenshot,
  boundingBox,
  script,
  primaryColor,
}: {
  screenshot: string;
  boundingBox: { x: number; y: number; width: number; height: number };
  script: string;
  primaryColor: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Target center of the UI component
  const targetX = boundingBox.x + boundingBox.width / 2;
  const targetY = boundingBox.y + boundingBox.height / 2;

  // SLOW, cinematic ease-in (duration: 8 seconds to match new scene length)
  const animationProgress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 10 }, // Original slow movement
    durationInFrames: 240,
  });

  // Gentle zoom and pan (original values)
  const scale = interpolate(animationProgress, [0, 0.7, 1], [1, 1.5, 1.3]);
  const rotateX = interpolate(animationProgress, [0, 0.7, 1], [20, 0, -3]);

  // Add subtle rotation for more visual interest
  const rotateZ = interpolate(animationProgress, [0, 1], [0, 1]);

  // Fade in effect to prevent blackout
  const opacity = interpolate(
    animationProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0.9]
  );

  return (
    <AbsoluteFill className="flex items-center justify-center bg-neutral-900 perspective-[2500px]">
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
          transformOrigin: `${targetX}px ${targetY}px`,
          transformStyle: "preserve-3d",
          opacity,
        }}
        className="flex items-center justify-center shadow-2xl shadow-black/50"
      >
        <Img src={screenshot} className="w-480 object-cover opacity-90" />
      </AbsoluteFill>

      {/* The Cinematic Text Overlay */}
      <AbsoluteFill className="justify-end bg-linear-to-t from-black/90 via-black/40 to-transparent p-24">
        <div className="max-w-4xl">
          <TextGenerateEffect
            words={script}
            className="text-5xl leading-tight tracking-tight text-white drop-shadow-2xl"
          />
          <div
            className="mt-8 h-1 w-24 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
