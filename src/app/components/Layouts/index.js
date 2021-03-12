import React from "react";
import PropTypes from "prop-types";
import styles from "./layout.module";

const BaseLayout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

BaseLayout.propTypes = { children: PropTypes.node };

export const TopLayout = ({ children }) => (
  <div className={styles.topContainer}>{children}</div>
);

TopLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
