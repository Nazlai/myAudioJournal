import React, { useState } from "react";
import { useFirebase } from "firebaseUtils";
import {
  Layout,
  Input,
  SubmitButton,
  Overlay,
  Button,
  Form,
  Modal,
  Warning,
} from "components";
import style from "./passwordReset.module";

const PasswordReset = () => {
  const firebase = useFirebase();
  const [display, setDisplay] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const isInvalid = email === "";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    firebase
      .doPasswordReset(email)
      .then(() => setDisplay(true))
      .catch((error) => setError(error));
  };

  return (
    <Layout>
      <h1>Password Reset</h1>
      <Form handleSubmit={handleSubmit} centerContent={true}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        />
        {error ? <Warning text={error.message} /> : null}

        <SubmitButton disabled={isInvalid} />
      </Form>
      {display ? (
        <Overlay>
          <div className={style.modalBackground}>
            <Layout>
              <Modal title="Email sent">
                <Modal.Item name="body">
                  <p>
                    An email has been sent, please check your inbox for password
                    reset instructions
                  </p>
                </Modal.Item>
                <Modal.Item name="controls">
                  <Button text="Close" handleClick={() => setDisplay(false)} />
                </Modal.Item>
              </Modal>
            </Layout>
          </div>
        </Overlay>
      ) : null}
    </Layout>
  );
};

export default PasswordReset;
