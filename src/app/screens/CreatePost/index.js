import React, { useState } from "react";
import UploadFile from "components/UploadFile";
import Input, { TextArea } from "components/Input";
import { SubmitButton } from "components/Button";
import Layout from "components/Layouts";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postJournal, setPostJournal] = useState("");
  const [postAudio, setPostAudio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ postTitle, postJournal, postAudio });
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
        <UploadFile />
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
