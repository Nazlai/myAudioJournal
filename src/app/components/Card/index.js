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
  const { title, content, date, audio } = props;
  const history = useHistory();
  const contentLength = 25;
  const displayLearnMore = countWords(content) > contentLength;

  const handleClick = () => {
    const location = {
      pathname: ROUTES.JOURNAL,
      state: {
        title,
        content,
        date,
        audio,
      },
    };

    history.push(location);
  };

  return (
    <div className={style.container}>
      <div className={style.title}>{capitalize(title)}</div>
      <span className={style.deleteIcon} onClick={props.handleDelete}>
        <i className="fas fa-trash-alt"></i>
      </span>

      <p>{date ? parseDate(date) : null}</p>
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
  date: PropTypes.string,
  handleDelete: PropTypes.func,
  audio: PropTypes.string,
};
