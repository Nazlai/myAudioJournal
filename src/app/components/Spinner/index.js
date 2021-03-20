import React from "react";
import style from "./spinner.module";

export const Spinner = () => {
  return (
    <div className={style.container}>
      <i className="fas fa-spinner fa-pulse"></i>
    </div>
  );
};
