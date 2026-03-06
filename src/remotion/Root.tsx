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
      />
    </>
  );
};
