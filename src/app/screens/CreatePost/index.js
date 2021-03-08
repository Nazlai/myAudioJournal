import React, { useState } from "react";
import UploadFile from "components/UploadFile";
import Input, { TextArea } from "components/Input";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [journal, setJournal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const setter = (set) => (event) => {
    const {
      target: { value },
    } = event;

    set(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <Input
            type="text"
            placeholder="title"
            value={title}
            onChange={setter(setTitle)}
          />
        </label>
        <UploadFile />
        <label>
          Journal
          <TextArea value={journal} onChange={setter(setJournal)} />
        </label>
      </form>
    </div>
  );
};

export default CreatePost;
