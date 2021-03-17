import React from "react";

const AudioPlayer = ({ url }) => {
  return <audio controls src={url}></audio>;
};

export default AudioPlayer;
