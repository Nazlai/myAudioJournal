import React from "react";
import ReactDOM from "react-dom";
import styles from "./overlay.module";

const portalRoot = document.getElementById("portal-root");

const Overlay = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.container} onClick={props.handleClose}>
      {props.children}
    </div>,
    portalRoot
  );
};

export default Overlay;
