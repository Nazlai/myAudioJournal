import React from "react";
import PropTypes from "prop-types";
import style from "./button.module";

const Button = ({ handleClick, text, type = "button", ...options }) => {
  return (
    <button
      className={style.btn}
      type={type}
      onClick={handleClick}
      {...options}
    >
      {text}
    </button>
  );
};

export const SubmitButton = ({ text = "Submit", ...rest }) => (
  <Button type="submit" text={text} {...rest} />
);

Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

SubmitButton.propTypes = {
  text: PropTypes.string,
};

export default Button;
