import React, { useState } from "react";
import { useFirebase } from "firebaseUtils";
import { Layout, Button, Warning } from "components";

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
