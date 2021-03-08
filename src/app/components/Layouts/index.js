import React from "react";
import PropTypes from "prop-types";
import styles from "./layout.module";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

Layout.propTypes = { children: PropTypes.node };

export default Layout;
