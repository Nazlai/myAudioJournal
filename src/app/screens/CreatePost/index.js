import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import { AUDIO_POST } from "constants/firebase";
import * as ROUTES from "constants/routes";
import * as LOAD_STATE from "constants/upload";
import useUpload from "utils/useUpload";

import {
  Layout,
  TopLayout,
  JournalForm,
  FormItem,
  Input,
  TextArea,
  SubmitButton,
  Spinner,
  Overlay,
  Warning,
} from "components";
import style from "./createPost.module";

// 3/10 move post form into separate component

const CreatePost = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const history = useHistory();
  const fileRef = useRef(null);
  const [postTitle, setPostTitle] = useState("");
  const [postJournal, setPostJournal] = useState("");
  const { email = "" } = auth;
  const [file, setFile] = useState("");
  const storageRef = firebase.doCreateChildRef(email);
  const { loadState, url, error } = useUpload(storageRef, file);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uid } = auth;
    const path = `${uid}/${AUDIO_POST}`;
    const date = new Date().toISOString();
    const payload = {
      title: postTitle,
      journal: postJournal,
      audio: url.fullPath || "",
      fileName: url.name || "",
      date: date,
    };

    firebase
      .createPost(path, payload)
      .then(history.push(ROUTES.HOME))
      .catch((error) => console.log(error));
  };

  const setter = (set) => (event) => {
    const {
      target: { value },
    } = event;

    set(value);
  };

  const isInvalid = postTitle === "" || postJournal === "";

  return (
    <TopLayout>
      <h1>Create Post</h1>
      <JournalForm handleSubmit={handleSubmit}>
        <FormItem label="Title:">
          <Input
            type="text"
            placeholder="title"
            value={postTitle}
            onChange={setter(setPostTitle)}
            direction="left"
          />
        </FormItem>
        <FormItem label="Journal:">
          <TextArea value={postJournal} onChange={setter(setPostJournal)} />
        </FormItem>
        <FormItem label="Audio File:">
          <label className={style.audioLabel}>
            Upload
            <input
              type="file"
              accept="audio/*"
              className={style.audio}
              ref={fileRef}
              onChange={(event) => {
                event.preventDefault();
                const file = fileRef.current.files[0];
                setFile(file);
              }}
            />
          </label>
          {url.name ? <p>{url.name}</p> : null}
          {error ? <Warning text={error.message} /> : null}
          {loadState === LOAD_STATE.RUNNING ? (
            <Overlay>
              <div className={style.loadingContainer}>
                <Layout>
                  <Spinner />
                </Layout>
              </div>
            </Overlay>
          ) : null}
        </FormItem>
        <div className={style.bottomContainer}>
          <SubmitButton disabled={isInvalid} />
        </div>
      </JournalForm>
    </TopLayout>
  );
};

export default CreatePost;
