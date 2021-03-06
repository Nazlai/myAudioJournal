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
import { getAudioPath } from "utils";
import style from "./createPost.module";

const CreatePost = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const history = useHistory();
  const fileRef = useRef(null);
  const [postTitle, setPostTitle] = useState("");
  const [postJournal, setPostJournal] = useState("");
  const { uid } = auth;
  const [file, setFile] = useState("");
  const storageRef = firebase.doCreateChildRef(getAudioPath(uid));
  const { loadState, url, error } = useUpload({
    uploadTask: storageRef,
    file,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
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
            placeholder="Title"
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
          {url.displayName ? <p>{url.displayName}</p> : null}
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
        <FormItem>
          <p className={style.uploadInfo}>
            Please upload a file smaller than 1mb.
          </p>
        </FormItem>
        <div className={style.bottomContainer}>
          <SubmitButton disabled={isInvalid} />
        </div>
      </JournalForm>
    </TopLayout>
  );
};

export default CreatePost;
