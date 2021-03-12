import React from "react";
import Layout from "components/Layouts";
import { useHistory } from "react-router-dom";

const Journal = () => {
  const history = useHistory();
  const {
    location: { state },
  } = history;
  const { title, content, audio } = state;

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{content}</p>
    </Layout>
  );
};

export default Journal;
