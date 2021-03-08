import React from "react";
import PropTypes from "prop-types";
import styles from "./input.module";

const Input = (props) => (
  <div className={styles.container}>
    <input className={styles.input} {...props} />
  </div>
);

export const TextArea = ({ cols = 30, rows = 8, ...rest }) => {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        cols={cols}
        rows={rows}
        maxLength={200}
        {...rest}
      />
    </div>
  );
};

TextArea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
};

export default Input;
