import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";

import { IntroScene } from "./scenes/IntroScene";
import { ShowcaseScene } from "./scenes/ShowcaseScene";

// 1. Use the official Phase 3 Contract
interface TrailerData {
  projectName?: string;
  primaryColor?: string;
  script?: { intro: string; feature: string; outro: string };
  assets?: {
    screenshotUrl: string;
    boundingBox: { x: number; y: number; width: number; height: number };
  };
}

export const MainVideo = (props: TrailerData) => {
  // 2. Map the strictly typed props
  const screenshot = props.assets?.screenshotUrl || "";
  const boundingBox = props.assets?.boundingBox || {
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
  };
  const primaryColor = props.primaryColor || "#10b981";
  const introScript = props.script?.intro || "Introducing our latest project.";

  return (
    <AbsoluteFill className="flex items-center justify-center bg-neutral-950">
      {screenshot ? (
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={90}>
            {/* Pass the updated props down to your scenes */}
            <IntroScene
              script={introScript}
              theme={{ primary: primaryColor, background: "#0a0a0a" }}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={springTiming({
              config: { damping: 200 },
              durationInFrames: 30,
            })}
          />

          <TransitionSeries.Sequence durationInFrames={180}>
            {/* Notice we are now passing boundingBox instead of focusPoint array */}
            <ShowcaseScene
              screenshot={screenshot}
              focusPoint={[
                boundingBox.y,
                boundingBox.x,
                boundingBox.y + boundingBox.height,
                boundingBox.x + boundingBox.width,
              ]}
            />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      ) : (
        <h1 className="text-5xl font-bold tracking-tight text-emerald-400">
          Awaiting AI Payload...
        </h1>
      )}
    </AbsoluteFill>
  );
};
