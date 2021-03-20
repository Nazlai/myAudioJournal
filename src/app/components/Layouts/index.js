import React from "react";
import PropTypes from "prop-types";
import style from "./layout.module";

export const BaseLayout = ({ children }) => (
  <div className={style.container}>
    <div className={style.content}>{children}</div>
  </div>
);

BaseLayout.propTypes = { children: PropTypes.node };

export const TopLayout = ({ children }) => (
  <div className={style.topContainer}>{children}</div>
);

TopLayout.propTypes = {
  children: PropTypes.node,
};
