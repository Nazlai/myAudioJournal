import React from "react";
import PropTypes from "prop-types";
import style from "./button.module";

const Button = ({ handleClick, text, ...options }) => {
  return (
    <button
      className={style.btn}
      type="button"
      onClick={handleClick}
      {...options}
    >
      {text}
    </button>
  );
};

export const SubmitButton = ({ text = "Submit", ...rest }) => (
  <div className={style.submitBtnContainer}>
    <button className={`${style.btn} ${style.submitBtn}`} {...rest}>
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
