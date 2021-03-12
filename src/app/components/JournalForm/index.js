import React from "react";
import PropTypes from "prop-types";
import style from "./journalForm.module";

const JournalForm = ({ children, handleSubmit }) => (
  <form className={style.form} onSubmit={handleSubmit}>
    {children}
  </form>
);

export const FormItem = ({ children, label }) => {
  return (
    <div className={style.container}>
      <p className={style.label}>{label}</p>
      {children}
    </div>
  );
};

FormItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};

export default JournalForm;
