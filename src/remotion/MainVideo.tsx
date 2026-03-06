import { AbsoluteFill } from "remotion";

import { ShowcaseScene } from "./scenes/ShowcaseScene";

// Define the exact shape of the payload coming from our Next.js API
type VideoProps = {
  assets?: string[];
  focusPoint?: number[];
  theme?: { primary: string; background: string };
  script?: string;
};

export const MainVideo = (props: VideoProps) => {
  // Extract the base64 screenshot and coordinates that Gemini generated
  const screenshot = props.assets?.[0] || "";
  const focusPoint = props.focusPoint || [0, 0, 1080, 1920];

  return (
    <AbsoluteFill className="flex items-center justify-center bg-neutral-950">
      {screenshot ? (
        <ShowcaseScene screenshot={screenshot} focusPoint={focusPoint} />
      ) : (
        <h1 className="text-5xl font-bold tracking-tight text-emerald-400">
          Awaiting AI Payload...
        </h1>
      )}
    </AbsoluteFill>
  );
};
