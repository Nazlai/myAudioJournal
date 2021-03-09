import React from "react";
import ReactDOM from "react-dom";
import styles from "./overlay.module";
import Layout from "components/Layouts";

const portalRoot = document.getElementById("portal-root");

const Overlay = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.container} onClick={props.handleClose}>
      <div className={styles.closeBtn}>
        <i className="fas fa-times" onClick={props.handleClose}></i>
      </div>
      <Layout>{props.children}</Layout>
    </div>,
    portalRoot
  );
};

export default Overlay;
