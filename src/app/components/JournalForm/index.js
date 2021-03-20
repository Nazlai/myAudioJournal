import React from "react";
import PropTypes from "prop-types";
import style from "./journalForm.module";

export const JournalForm = ({ children, handleSubmit }) => (
  <form className={style.form} onSubmit={handleSubmit}>
    {children}
  </form>
);

export const JournalFormItem = ({ children, label }) => {
  return (
    <div className={style.container}>
      <p className={style.label}>{label}</p>
      {children}
    </div>
  );
};

JournalFormItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};
