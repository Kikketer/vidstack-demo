import { useEffect, useState } from "react";

export type UseTrimSlider = (T: {
  duration: number;
  onSeek: (time: number) => void;
  isReady: boolean;
  defaultStart?: number;
  defaultEnd?: number;
}) => {
  maxLength: number;
  trimStart: number;
  trimEnd: number;
  onSetTrim: (T: [number, number]) => void;
  onSeek: (time: number) => void;
};

export const useTrimSlider: UseTrimSlider = ({
  duration,
  onSeek,
  isReady,
  defaultStart,
  defaultEnd,
}) => {
  //   const trimStart = useRef<number>(0);
  const [trimStart, setTrimStart] = useState<number>(defaultStart ?? 0);
  //   const trimEnd = useRef<number>(playerRef.current?.getDuration() ?? 5);
  const [trimEnd, setTrimEnd] = useState<number>(defaultEnd ?? duration);

  const onSetTrim = ([start, end]: [number, number]) => {
    // We are moving the start tab, with that we adjust the player scrub
    if (start !== trimStart) {
      onSeek(start);
    } else if (end !== trimEnd) {
      onSeek(end);
    }

    setTrimStart(start);
    setTrimEnd(end);
  };

  // const onSeek = (time: number) => {
  //     onSeek(time);
  // };

  useEffect(() => {
    // First time we are ready, set the trimEnd
    if (isReady) {
      setTrimEnd(defaultEnd ?? duration);
    }
  }, [isReady]);

  return {
    maxLength: isReady ? duration : 0,
    trimStart: trimStart,
    trimEnd: trimEnd,
    onSeek,
    onSetTrim,
  };
};
