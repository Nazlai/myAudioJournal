import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import * as ROUTES from "constants/routes";
import style from "./card.module";
import { Button } from "components";
import { parseDate } from "utils";

const capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const countWords = (string) => string.split(" ").length;

const trunc = (limit) => (string) =>
  string.split(" ").slice(0, limit).join(" ");

export const Card = (props) => {
  const { title, content, date } = props;
  const history = useHistory();
  const contentLength = 25;
  const displayLearnMore = countWords(content) > contentLength;

  const handleClick = () => {
    const location = {
      pathname: ROUTES.JOURNAL,
      state: props,
    };

    history.push(location);
  };

  return (
    <div className={style.container}>
      <div className={style.title}>{capitalize(title)}</div>
      <p>{parseDate(date)}</p>
      <div className={style.content}>
        {displayLearnMore ? `${trunc(contentLength)(content)}...` : content}
      </div>
      <Button text="View" handleClick={handleClick} />
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
