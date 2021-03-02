import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { EDIT_POST } from "constants/routes";

const Journal = (props) => {
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
    <div onClick={handleClick}>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  );
};

Journal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Journal;
