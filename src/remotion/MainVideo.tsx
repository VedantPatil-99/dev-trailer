import React from "react";

import { Audio } from "@remotion/media";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill } from "remotion";

import { IntroScene } from "./scenes/IntroScene";
import { ShowcaseScene } from "./scenes/ShowcaseScene";

interface TrailerData {
  projectName?: string;
  primaryColor?: string;
  assets?: {
    screenshotUrl: string;
    voiceoverUrl?: string; // <-- ADD THIS LINE
  };
  scenes?: Array<{
    script: string;
    animationStyle: string;
    boundingBox: { x: number; y: number; width: number; height: number };
  }>;
}

export const MainVideo = (props: TrailerData) => {
  const screenshot = props.assets?.screenshotUrl || "";
  const voiceoverUrl = props.assets?.voiceoverUrl || null; // Extract the audio
  const scenes = props.scenes || [];
  const primaryColor = props.primaryColor || "#10b981";

  return (
    <AbsoluteFill className="flex items-center justify-center bg-neutral-950">
      {voiceoverUrl && <Audio src={voiceoverUrl} volume={1} />}
      {screenshot && scenes.length > 0 ? (
        <TransitionSeries>
          {/* Intro Scene - 5 seconds */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <IntroScene
              script={scenes[0]?.script || "Welcome to our amazing project"}
              theme={{ primary: primaryColor, background: "#0a0a0a" }}
            />
          </TransitionSeries.Sequence>

          {/* Fade to first showcase scene */}
          <TransitionSeries.Transition
            presentation={fade()}
            timing={springTiming({
              config: { damping: 200 },
              durationInFrames: 45,
            })}
          />

          {/* Showcase Scenes - 8 seconds each */}
          {scenes.map((scene, index) => (
            <React.Fragment key={index}>
              <TransitionSeries.Sequence durationInFrames={240}>
                <ShowcaseScene
                  screenshot={screenshot}
                  boundingBox={scene.boundingBox}
                  script={scene.script}
                  primaryColor={primaryColor}
                />
              </TransitionSeries.Sequence>

              {/* Slow, elegant 2-second fade between components */}
              {index < scenes.length - 1 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={springTiming({
                    config: { damping: 200 },
                    durationInFrames: 60,
                  })}
                />
              )}
            </React.Fragment>
          ))}

          {/* Outro Scene - 5 seconds */}
          {scenes.length > 0 && (
            <>
              <TransitionSeries.Transition
                presentation={fade()}
                timing={springTiming({
                  config: { damping: 200 },
                  durationInFrames: 45,
                })}
              />
              <TransitionSeries.Sequence durationInFrames={150}>
                <IntroScene
                  script="Thank you for watching!"
                  theme={{ primary: primaryColor, background: "#0a0a0a" }}
                />
              </TransitionSeries.Sequence>
            </>
          )}
        </TransitionSeries>
      ) : (
        <h1 className="text-5xl font-bold tracking-tight text-emerald-400">
          Awaiting AI Payload...
        </h1>
      )}
    </AbsoluteFill>
  );
};
