import React, { useState } from "react";
import UploadFile from "components/UploadFile";
import Input, { TextArea } from "components/Input";
import { SubmitButton } from "components/Button";
import Layout from "components/Layouts";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import { audioPost } from "constants/firebase";

// 3/10 move post form into separate component

const CreatePost = () => {
  const firebase = useFirebase();
  const auth = useAuth();
  const [postTitle, setPostTitle] = useState("");
  const [postJournal, setPostJournal] = useState("");
  const [postAudio, setPostAudio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uid } = auth;
    const path = `${uid}/${audioPost}`;
    const payload = {
      title: postTitle,
      journal: postJournal,
      audio: postAudio,
    };

    firebase
      .createPost(path, payload)
      .then((snapShot) => console.log(snapShot))
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
    <Layout>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <Input
            type="text"
            placeholder="title"
            value={postTitle}
            onChange={setter(setPostTitle)}
          />
        </label>
        <UploadFile handleClick={setPostAudio} />
        <label>
          Journal
          <TextArea value={postJournal} onChange={setter(setPostJournal)} />
        </label>
        <SubmitButton disabled={isInvalid} />
      </form>
    </Layout>
  );
};

export default CreatePost;
