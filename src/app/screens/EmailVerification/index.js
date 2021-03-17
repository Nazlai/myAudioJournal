import React, { useState } from "react";
import Layout from "components/Layouts";
import Button from "components/Button";
import { useFirebase } from "firebaseUtils";
import Warning from "components/Warning";

const EmailVerification = () => {
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const firebase = useFirebase();
  const handleClick = () => {
    firebase.doSendVerificationEmail().catch((error) => {
      setDisable(true);
      setError(error);
    });
  };

  return (
    <Layout>
      <h1>Verify Email</h1>
      <Button
        text="Send Verification"
        handleClick={handleClick}
        disabled={disable}
      />
      {error && <Warning text={error.message} />}
    </Layout>
  );
};

export default EmailVerification;
