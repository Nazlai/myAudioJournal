import React from "react";
import Card from "components/Card";
import style from "./feed.module";

// 3/9 TODO
// fix Feed styles

const Feed = () => {
  const arr = [
    { title: "hello", content: "world" },
    { title: "whats", content: "up" },
  ];

  return (
    <div className={style.container}>
      {arr.map((i, index) => (
        <Card {...i} key={index} />
      ))}
    </div>
  );
};

export default Feed;
