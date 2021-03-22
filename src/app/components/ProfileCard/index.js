import React, { Children } from "react";
import PropTypes from "prop-types";
import style from "./profileCard.module";

export const ProfileCard = ({ children, profileImg }) => {
  const childrenArray = Children.toArray(children);
  const TopContainer = childrenArray.find(
    (child) => child.props.name === "topContainer"
  );
  const MidContainer = childrenArray.find(
    (child) => child.props.name === "midContainer"
  );
  const BottomContainer = childrenArray.find(
    (child) => child.props.name === "bottomContainer"
  );

  return (
    <div className={style.card}>
      <div className={style.topContainer}>
        <div className={style.imgContainer}>
          <img src={profileImg} className={style.img} />
        </div>
        <div className={style.infoContainer}>{TopContainer}</div>
      </div>
      <div className={style.bio}>{MidContainer}</div>
      <div className={style.bottomContainer}>{BottomContainer}</div>
    </div>
  );
};

ProfileCard.Slot = ({ children }) => children;

ProfileCard.propTypes = {
  children: PropTypes.node,
  profileImg: PropTypes.string,
};
