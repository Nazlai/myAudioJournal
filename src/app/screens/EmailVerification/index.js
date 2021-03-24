import React, { useState } from "react";
import { useFirebase } from "firebaseUtils";
import { Layout, Button, Warning } from "components";

const EmailVerification = () => {
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const firebase = useFirebase();

  const handleClick = () => {
    firebase
      .doSendVerificationEmail()
      .then(() => setDisable(true))
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Layout>
      <h1>Verify Email</h1>
      <Button
        text={disable ? "Email sent" : "Send Verification"}
        handleClick={handleClick}
        disabled={disable}
      />
      {error && <Warning text={error.message} />}
    </Layout>
  );
};

export default EmailVerification;
