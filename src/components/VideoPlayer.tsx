"use client";

import { Player } from "@remotion/player";

import { MainVideo } from "@/remotion/MainVideo";

type VideoPlayerProps = {
  inputProps?: Record<string, unknown>;
};

export const VideoPlayer = ({ inputProps = {} }: VideoPlayerProps) => {
  return (
    <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)]">
      <Player
        component={MainVideo}
        durationInFrames={1800}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        controls={true}
        inputProps={inputProps}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
