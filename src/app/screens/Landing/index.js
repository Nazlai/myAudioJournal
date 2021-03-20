import React from "react";
import { Layout } from "components";

const gitHubLink = "https://github.com/Nazlai/myAudioJournal";

const Landing = () => {
  return (
    <Layout>
      <h1>Hi There</h1>
      <p>
        Be sure to check out the project <a href={gitHubLink}>Here</a>
      </p>
    </Layout>
  );
};

export default Landing;
