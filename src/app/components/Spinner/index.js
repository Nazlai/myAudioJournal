import React from "react";
import Layout from "components/Layouts";
import style from "./spinner.module";

const Spinner = () => {
  return (
    <Layout>
      <div className={style.container}>
        <i className="fas fa-spinner fa-pulse"></i>
      </div>
    </Layout>
  );
};

export default Spinner;
