import React from "react";
import PropTypes from "prop-types";
import style from "./input.module";

export const Input = (props) => <input className={style.input} {...props} />;

export const TextArea = ({ cols = 30, rows = 8, ...rest }) => {
  return (
    <textarea
      className={style.textArea}
      cols={cols}
      rows={rows}
      maxLength={200}
      {...rest}
    />
  );
};

TextArea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
};
