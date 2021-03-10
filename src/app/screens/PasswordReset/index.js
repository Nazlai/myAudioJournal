import React, { useState } from "react";
import Layout from "components/Layouts";
import Input from "components/Input";
import { SubmitButton } from "components/Button";
import { useFirebase } from "firebaseUtils";

const PasswordReset = () => (
  <Layout>
    <h1>Password Reset</h1>
    <PasswordResetForm />
  </Layout>
);

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const firebase = useFirebase();
  const isInvalid = email === "";

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO
    // display check email for password reset modal on success
    // route to sign in
    firebase.doPasswordReset(email).then(console.log).catch(console.log);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="email"
      />
      <SubmitButton disabled={isInvalid} />
    </form>
  );
};

export default PasswordReset;
