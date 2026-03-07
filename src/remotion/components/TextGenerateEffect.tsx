import React from "react";

import { spring, useCurrentFrame, useVideoConfig } from "remotion";

import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wordsArray = words.split(" ");

  return (
    <div className={cn("flex flex-wrap gap-x-2 gap-y-1 font-bold", className)}>
      {wordsArray.map((word, idx) => {
        // Stagger each word by 8 frames (slower for 8-second scenes)
        const delay = idx * 8;

        // Remotion Spring Physics (original slower animation)
        const wordAnimation = spring({
          frame: frame - delay,
          fps,
          config: { damping: 14, stiffness: 100 }, // Original values
        });

        // Interpolate blur from 10px to 0px
        const blur = (1 - wordAnimation) * 10;

        return (
          <span
            key={`${word}-${idx}`}
            style={{
              opacity: wordAnimation,
              filter: `blur(${blur}px)`,
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
