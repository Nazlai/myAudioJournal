import React from "react";
import PropTypes from "prop-types";
import style from "./form.module";

export const Form = ({ handleSubmit, children, ...rest }) => {
  return (
    <form className={style.form} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
};
