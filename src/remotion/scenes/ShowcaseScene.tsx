import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const ShowcaseScene = ({
  screenshot,
  focusPoint,
}: {
  screenshot: string;
  focusPoint: number[];
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Calculate the center of the AI's bounding box to zoom into
  const [ymin, xmin, ymax, xmax] = focusPoint || [0, 0, 1080, 1920];
  const targetX = xmin + (xmax - xmin) / 2;
  const targetY = ymin + (ymax - ymin) / 2;

  // 2. Setup the physics spring for a smooth, cinematic ease-in
  const animationProgress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 20 }, // High damping to avoid cartoon-like bouncing
    durationInFrames: 120, // 4 seconds
  });

  // 3. Interpolate the spring value (0 to 1) into actual CSS transforms
  const scale = interpolate(animationProgress, [0, 1], [1, 1.8]);
  const rotateX = interpolate(animationProgress, [0, 1], [30, 0]); // Tilt flat
  const rotateY = interpolate(animationProgress, [0, 1], [-20, 0]); // Pan right

  return (
    <AbsoluteFill className="flex items-center justify-center bg-neutral-900 perspective-[2000px]">
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformOrigin: `${targetX}px ${targetY}px`, // Zoom directly to what the AI found!
          transformStyle: "preserve-3d",
        }}
        className="flex items-center justify-center shadow-2xl shadow-black/50"
      >
        {screenshot && (
          <Img
            src={screenshot}
            className="h-[1080px] w-[1920px] rounded-xl border border-white/10 object-cover"
          />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
