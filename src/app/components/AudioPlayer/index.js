import React from "react";
import PropTypes from "prop-types";
import style from "./audioPlayer.module";

export const AudioPlayer = ({ url }) => {
  return <audio controls src={url} className={style.audio}></audio>;
};

AudioPlayer.propTypes = {
  url: PropTypes.string,
};
