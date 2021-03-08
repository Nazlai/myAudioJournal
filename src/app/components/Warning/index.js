import React from "react";
import PropTypes from "prop-types";
import styles from "./warning.module";

const Warning = ({ text }) => <p className={styles.text}>{text}</p>;

Warning.propTypes = {
  text: PropTypes.string,
};

export default Warning;
