import React, { useEffect, useState, useRef } from "react";

const initialState = {
  paused: true,
  muted: false,
  volume: 100,
  duration: 0,
  time: 0,
};

const useAudio = ({ src, autoPlay = false }) => {
  const ref = useRef(null);
  const [state, setAudioState] = useState(initialState);
  const setState = (partialState) =>
    setAudioState({ ...state, ...partialState });

  const element = (
    <audio
      controls={false}
      ref={ref}
      src={src}
      onPlay={() => setState({ pause: false })}
      onDurationChange={() => {
        const el = ref.current;
        if (!el) {
          return;
        }
        const { duration } = el;
        setState({ duration });
      }}
      onTimeUpdate={() => {
        const el = ref.current;
        if (!el) {
          return;
        }
        const { currentTime } = el;
        setState({ time: currentTime });
      }}
    />
  );
  const controls = {
    play: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.play();
      setState({ paused: false });
    },
    pause: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.pause();
      setState({ paused: true });
    },
    volume: (rawVolume) => {
      const el = ref.current;
      if (!el) {
        return;
      }
      const volume = Math.min(100, Math.max(0, rawVolume));
      el.volume = volume / 100;
      setState({ volume });
    },
    mute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = true;
      setState({ muted: true });
    },
    unmute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = false;
      setState({ muted: false });
    },
    seek: (time) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }
      time = Math.min(state.duration, Math.max(0, time));
      setState({ time });
      controls.pause();
      el.currentTime = time;
    },
  };

  useEffect(() => {
    const el = ref.current;
    const { muted, paused } = el;

    setState({
      muted,
      paused,
    });

    if (autoPlay && paused) {
      controls.play();
    }
  }, [src]);
  return [element, state, controls];
};

export default useAudio;
