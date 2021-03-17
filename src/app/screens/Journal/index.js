import React from "react";
import { TopLayout } from "components/Layouts";
import { useHistory } from "react-router-dom";
import AudioPlayer from "components/AudioPlayer";
import style from "./journal.module";
import { parseDate } from "utils";

const Journal = () => {
  const history = useHistory();
  const {
    location: { state },
  } = history;
  const defaultAudio =
    "https://firebasestorage.googleapis.com/v0/b/maj2021-db59c.appspot.com/o/rtvdoe%40gmail.com%2F20210204%20100613.m4a?alt=media&token=425ed467-458e-4fe7-a004-23ee43e07ce5";
  const { title, content, audio = defaultAudio, date } = state;

  return (
    <TopLayout>
      <h1>{title}</h1>
      <div className={style.content}>
        <p className={style.date}>{parseDate(date)}</p>
        {audio ? <AudioPlayer url={audio} /> : null}
        <p className={style.text}>{content}</p>
      </div>
    </TopLayout>
  );
};

export default Journal;
