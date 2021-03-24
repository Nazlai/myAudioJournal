import React, { Children } from "react";
import PropTypes from "prop-types";
import style from "./modal.module";

export const Modal = ({ title, children }) => {
  const childrenArray = Children.toArray(children);
  const body = childrenArray.find((child) => child.props.name === "body");
  const controls = childrenArray.find(
    (child) => child.props.name === "controls"
  );

  return (
    <div className={style.modal}>
      <h2 className={style.modalTitle}>{title}</h2>
      <div className={style.modalText}>{body}</div>
      {controls}
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Modal.Item = ({ children }) => children;
