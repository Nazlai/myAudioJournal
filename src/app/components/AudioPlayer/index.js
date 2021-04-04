import React from "react";
import PropTypes from "prop-types";
import useAudio from "utils/useAudio";
import style from "./audioPlayer.module";

const pad = (num) => (num < 10 ? `0${num}` : num);

const parseDuration = (seconds) => {
  const sec = Math.floor(seconds % 60);
  const min = Math.floor(seconds / 60);
  return `${min}:${pad(sec)}`;
};

const Icon = (iconClassName) => <i className={iconClassName} />;
const Play = () => <Icon iconClassName="far fa-play-circle" />;
const Pause = () => <Icon iconClassName="far fa-pause-circle" />;
const Backward = () => <Icon iconClassName="fas fa-backward" />;
const Forward = () => <Icon iconClassName="fas fa-forward" />;

export const AudioPlayer = ({ url }) => {
  const [element, state, controls] = useAudio({ src: url });
  const handleClick = () => {
    state.paused ? controls.play() : controls.pause();
  };

  return (
    <div className={style.audioPlayer}>
      {element}
      <div className={style.rangeContainer}>
        <input
          type="range"
          max={state.duration}
          value={state.time}
          onChange={(event) => controls.seek(event.target.value)}
        />
      </div>
      <div className={style.durationContainer}>
        <span>{state.time ? parseDuration(state.time) : "0:00"}</span>
        <span>
          {parseDuration(Math.floor(state.duration) - Math.floor(state.time))}
        </span>
      </div>
      <div className={style.controlContainer}>
        <a
          className={style.seekBtn}
          onClick={() => controls.seek(state.time - 5)}
        >
          <Backward />
        </a>
        <a className={style.controlBtn} onClick={handleClick}>
          {state.paused ? <Play /> : <Pause />}
        </a>
        <a
          className={style.seekBtn}
          onClick={() => controls.seek(state.time + 5)}
        >
          <Forward />
        </a>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  url: PropTypes.string,
};
