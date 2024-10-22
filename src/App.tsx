import { useRef, useState, useEffect } from "react";
import {
  MediaPlayer,
  MediaProvider,
  useMediaProvider,
  useMediaState,
} from "@vidstack/react";
import { TrimSlider } from "./TrimSlider.tsx";
import { useTrimSlider } from "./useTrimSlider.tsx";
import "@vidstack/react/player/styles/base.css";
import "./App.css";

/**
 * Demo of the VidStack player
 * https://www.vidstack.io/docs/player/components/core/player?styling=tailwind-css#api-reference
 */

const videoUrl =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const WithVideoContext = ({ videoReady }: { videoReady?: boolean }) => {
  const provider = useMediaProvider();
  const duration = useMediaState("duration");

  const fakeStart = 30;
  const fakeEnd = 150.2;

  const { trimStart, trimEnd, onSetTrim, maxLength } = useTrimSlider({
    duration,
    onSeek: (time) => provider?.setCurrentTime(time),
    isReady: videoReady ?? false,
    defaultStart: fakeStart,
    defaultEnd: fakeEnd,
  });

  useEffect(() => {
    if (videoReady) {
      provider?.setCurrentTime(trimStart);
    }
  }, [videoReady]);

  return (
    <>
      <TrimSlider
        max={maxLength}
        trimStart={trimStart}
        trimEnd={trimEnd}
        onSetTrim={onSetTrim}
        onStartClick={() => provider?.setCurrentTime(trimStart)}
        onEndClick={() => provider?.setCurrentTime(trimEnd)}
      />
      <pre style={{ width: 500, background: "lightgrey", padding: "0.5rem" }}>
        {JSON.stringify({ trimStart, trimEnd }, null, 2)}
      </pre>
    </>
  );
};

function App() {
  const [videoReady, setVideoReady] = useState(false);
  const playerRef = useRef<any>(null);

  return (
    <div className="App">
      <MediaPlayer
        ref={playerRef}
        title="Sprite Fight"
        src={videoUrl}
        load="visible"
        onLoadedMetadata={() => setVideoReady(true)}
        controls
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MediaProvider />
          <WithVideoContext videoReady={videoReady} />
        </div>
      </MediaPlayer>
    </div>
  );
}

export default App;
