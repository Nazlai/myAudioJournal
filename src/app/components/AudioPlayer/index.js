import React from "react";

export const AudioPlayer = ({ url }) => {
  return <audio controls src={url}></audio>;
};
