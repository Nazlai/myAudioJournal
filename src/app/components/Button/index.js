import React from "react";
import PropTypes from "prop-types";
import styles from "./button.module";

const Button = ({ handleClick, text }) => {
  return (
    <button className={styles.btn} type="button" onClick={handleClick}>
      {text}
    </button>
  );
};

export const SubmitButton = ({ text = "Submit", ...rest }) => (
  <div className={styles.submitBtnContainer}>
    <button className={`${styles.btn} ${styles.submitBtn}`} {...rest}>
      {text}
    </button>
  </div>
);

Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
};

SubmitButton.propTypes = {
  text: PropTypes.string,
};

export default Button;
