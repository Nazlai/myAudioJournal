import React from "react";
import { useHistory } from "react-router-dom";
import { TopLayout, AudioPlayer } from "components";
import { parseDate } from "utils";
import style from "./journal.module";

const Journal = () => {
  const history = useHistory();
  const {
    location: { state },
  } = history;

  const { title, content, audio, date } = state;

  return (
    <TopLayout>
      <h1>{title}</h1>
      <div className={style.content}>
        <p className={style.date}>{date ? parseDate(date) : null}</p>
        {audio ? <AudioPlayer url={audio} /> : null}
        <p className={style.text}>{content}</p>
      </div>
    </TopLayout>
  );
};

export default Journal;
