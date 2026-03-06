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
        // Stagger each word by 4 frames
        const delay = idx * 4;

        // Remotion Spring Physics (replaces Framer Motion)
        const wordAnimation = spring({
          frame: frame - delay,
          fps,
          config: { damping: 14, stiffness: 100 },
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
