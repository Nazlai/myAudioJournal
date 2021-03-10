import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { EDIT_POST } from "constants/routes";
import style from "./card.module";

const capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const Card = (props) => {
  console.log(props);
  const { title, content } = props;
  const history = useHistory();

  const handleClick = () => {
    const location = {
      pathname: EDIT_POST,
      state: props,
    };

    history.push(location);
  };

  return (
    <div onClick={handleClick} className={style.container}>
      <div className={style.title}>{capitalize(title)}</div>
      <div className={style.content}>{content}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Card;
