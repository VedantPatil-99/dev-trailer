import { Composition } from "remotion";

import { MainVideo } from "./MainVideo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DevTrailerMain"
        component={MainVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          // Define the default empty state
          assets: [],
          focusPoint: [0, 0, 1080, 1920],
          theme: { primary: "#10b981", background: "#0a0a0a" },
          script: "",
        }}
      />
    </>
  );
};
