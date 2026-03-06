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

  // SLOW, cinematic ease-in (duration: 6 seconds)
  const animationProgress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 10 }, // Very low stiffness for slow movement
    durationInFrames: 180,
  });

  // Deep zoom and pan
  const scale = interpolate(animationProgress, [0, 1], [1, 2.2]);
  const rotateX = interpolate(animationProgress, [0, 1], [25, 0]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-neutral-900 perspective-[2500px]">
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) rotateX(${rotateX}deg)`,
          transformOrigin: `${targetX}px ${targetY}px`,
          transformStyle: "preserve-3d",
        }}
        className="flex items-center justify-center shadow-2xl shadow-black/50"
      >
        <Img src={screenshot} className="w-480 object-cover opacity-80" />
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
