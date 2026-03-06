import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";

import { IntroScene } from "./scenes/IntroScene";
import { ShowcaseScene } from "./scenes/ShowcaseScene";

type VideoProps = {
  assets?: string[];
  focusPoint?: number[];
  theme?: { primary: string; background: string };
  script?: string;
};

export const MainVideo = (props: VideoProps) => {
  const screenshot = props.assets?.[0] || "";
  const focusPoint = props.focusPoint || [0, 0, 1080, 1920];
  const theme = props.theme || { primary: "#10b981", background: "#0a0a0a" };
  const script = props.script || "";

  return (
    <AbsoluteFill className="flex items-center justify-center bg-neutral-950">
      {screenshot ? (
        <TransitionSeries>
          {/* 1. The Intro Scene (plays for 90 frames / 3 seconds) */}
          <TransitionSeries.Sequence durationInFrames={90}>
            <IntroScene script={script} theme={theme} />
          </TransitionSeries.Sequence>

          {/* 2. The Cinematic Cut */}
          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={springTiming({
              config: { damping: 200 },
              durationInFrames: 30,
            })}
          />

          {/* 3. The 3D Showcase Scene (plays for the remaining time) */}
          <TransitionSeries.Sequence durationInFrames={180}>
            <ShowcaseScene screenshot={screenshot} focusPoint={focusPoint} />
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
