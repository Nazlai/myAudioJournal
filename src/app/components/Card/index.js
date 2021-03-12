import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import * as ROUTES from "constants/routes";
import style from "./card.module";
import Button from "components/Button";

const capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const countWords = (string) => string.split(" ").length;

const trunc = (limit) => (string) =>
  string.split(" ").slice(0, limit).join(" ");

const Card = (props) => {
  const { title, content } = props;
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
      <div className={style.content}>
        {displayLearnMore ? `${trunc(contentLength)(content)}...` : content}
      </div>
      {displayLearnMore ? (
        <Button text="Learn More" handleClick={handleClick} />
      ) : null}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Card;
