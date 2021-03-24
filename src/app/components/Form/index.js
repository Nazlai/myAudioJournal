import React from "react";
import PropTypes from "prop-types";
import style from "./form.module";

export const Form = ({
  handleSubmit,
  centerContent = false,
  children,
  ...rest
}) => {
  return centerContent ? (
    <form className={style.form} onSubmit={handleSubmit} {...rest}>
      <div className={style.center}>{children}</div>
    </form>
  ) : (
    <form className={style.form} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  centerContent: PropTypes.bool,
  children: PropTypes.node,
};
