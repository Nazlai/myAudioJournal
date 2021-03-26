import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "components";
import * as ROUTES from "constants/routes";

const gitHubLink = "https://github.com/Nazlai/myAudioJournal";

const Landing = () => {
  return (
    <Layout>
      <h1>Hi There</h1>
      <p>
        Please <Link to={ROUTES.SIGN_IN}>Sign in</Link> to continue
      </p>
      <p>
        Be sure to check out the project <a href={gitHubLink}>Here</a>
      </p>
    </Layout>
  );
};

export default Landing;
