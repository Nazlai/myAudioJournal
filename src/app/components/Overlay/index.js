import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import style from "./overlay.module";

const portalRoot = document.getElementById("portal-root");

export const Overlay = (props) => {
  useEffect(() => {
    const root = document.getElementById("root");
    root.style.overflow = "hidden";
    return () => (root.style.overflow = "");
  }, []);

  return ReactDOM.createPortal(
    <div className={style.container} onClick={props.handleClose || ((n) => n)}>
      {props.children}
    </div>,
    portalRoot
  );
};
