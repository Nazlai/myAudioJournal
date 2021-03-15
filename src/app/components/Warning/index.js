import React from "react";
import PropTypes from "prop-types";
import style from "./warning.module";

const Warning = ({ text }) => <p className={style.text}>{text}</p>;

Warning.propTypes = {
  text: PropTypes.string,
};

export default Warning;
