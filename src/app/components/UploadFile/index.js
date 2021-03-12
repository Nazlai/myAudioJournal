import React, { useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import style from "./uploadFile.module";
import Button from "components/Button";
import Overlay from "components/Overlay";
import Layout from "components/Layouts";
import Spinner from "components/Spinner";

const UPLOAD_STATE = {
  IDLE: "IDLE",
  RUNNING: "running",
  FINISHED: "finished",
  ERROR: "error",
};

const UploadFile = (props) => {
  const fileRef = useRef();
  const firebase = useFirebase();
  const auth = useAuth();
  const [uploadState, setUploadState] = useState(UPLOAD_STATE.IDLE);

  const handleClick = () => fileRef.current.click();

  const handleChange = (event) => {
    event.preventDefault();
    const file = fileRef.current.files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const { name } = file;
    const { email } = auth;
    const path = `${email}/${name}`;

    const uploadTask = firebase.doUploadFile(path, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        setUploadState(UPLOAD_STATE.RUNNING);
      },
      console.log,
      () => {
        setUploadState(UPLOAD_STATE.FINISHED);
        const { fullPath, name } = uploadTask.snapshot.ref;
        props.handleClick({ fullPath, name });
      }
    );
  };

  return (
    <Fragment>
      <Button handleClick={handleClick} type="button" text="Upload" />
      <input
        className={style.fileInput}
        type="file"
        accept={props.accept}
        onChange={handleChange}
        ref={fileRef}
      />
      {uploadState === UPLOAD_STATE.RUNNING ? (
        <Overlay>
          <div className={style.container}>
            <Layout>
              <Spinner />
            </Layout>
          </div>
        </Overlay>
      ) : null}
    </Fragment>
  );
};

UploadFile.propTypes = {
  handleClick: PropTypes.func,
  accept: PropTypes.string,
};

export default UploadFile;
