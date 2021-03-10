import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import style from "./uploadFile.module";

const UploadFile = (props) => {
  const fileRef = useRef();
  const firebase = useFirebase();
  const auth = useAuth();

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

    firebase
      .doUploadFile(path, file)
      .then((snapShot) => {
        console.log(snapShot);
        const {
          metadata: { fullPath },
        } = snapShot;
        props.handleClick(fullPath);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        upload
      </button>
      <input
        className={style.fileInput}
        type="file"
        accept="audio/*"
        onChange={handleChange}
        ref={fileRef}
      />
    </div>
  );
};

UploadFile.propTypes = {
  handleClick: PropTypes.func,
};

export default UploadFile;
