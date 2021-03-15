import React from "react";
import PropTypes from "prop-types";
import style from "./input.module";

const Input = (props) => (
  <div className={style.container}>
    <input className={style.input} {...props} />
  </div>
);

export const TextArea = ({ cols = 30, rows = 8, ...rest }) => {
  return (
    <div className={style.container}>
      <textarea
        className={style.textArea}
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
