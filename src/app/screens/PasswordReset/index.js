import React, { useState } from "react";
import { useFirebase } from "firebaseUtils";
import { Layout, Input, SubmitButton, Overlay, Button, Form } from "components";
import style from "./passwordReset.module";

const PasswordReset = () => {
  const firebase = useFirebase();
  const [display, setDisplay] = useState(false);
  const [email, setEmail] = useState("");
  const isInvalid = email === "";

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .doPasswordReset(email)
      .then(() => setDisplay(true))
      .catch(console.log);
  };

  return (
    <Layout>
      <h1>Password Reset</h1>
      <Form handleSubmit={handleSubmit}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        />
        <SubmitButton disabled={isInvalid} />
      </Form>
      {display ? (
        <Overlay>
          <Layout>
            <div className={style.modal}>
              <p>
                An email has been sent, please check your inbox for password
                reset instructions
              </p>
              <Button text="Close" handleClick={() => setDisplay(false)} />
            </div>
          </Layout>
        </Overlay>
      ) : null}
    </Layout>
  );
};

export default PasswordReset;
