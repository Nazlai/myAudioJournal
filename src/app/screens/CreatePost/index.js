import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UploadFile from "components/UploadFile";
import Input, { TextArea } from "components/Input";
import { SubmitButton } from "components/Button";
import { TopLayout } from "components/Layouts";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import { AUDIO_POST } from "constants/firebase";
import * as ROUTES from "constants/routes";
import JournalForm, { FormItem } from "components/JournalForm";

// 3/10 move post form into separate component

const CreatePost = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const history = useHistory();
  const [postTitle, setPostTitle] = useState("");
  const [postJournal, setPostJournal] = useState("");
  const [postAudio, setPostAudio] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uid } = auth;
    const path = `${uid}/${AUDIO_POST}`;
    const date = new Date().toISOString();
    const payload = {
      title: postTitle,
      journal: postJournal,
      audio: postAudio.fullPath || "",
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
          {postAudio.name ? <p>{postAudio.name}</p> : null}
          <UploadFile handleClick={setPostAudio} accept="audio/*" />
        </FormItem>
        <SubmitButton disabled={isInvalid} />
      </JournalForm>
    </TopLayout>
  );
};

export default CreatePost;
