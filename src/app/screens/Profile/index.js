import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "firebaseUtils";
import { PROFILE } from "constants/firebase";
import * as ROUTES from "constants/routes";
import { TopLayout, Button, ProfileCard } from "components";
import style from "./profile.module";

const profileImgFallback =
  "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Profile = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [bio, setBio] = useState("");
  const { name, email = "", uid, photoURL } = firebase.getUser();

  useEffect(() => {
    if (uid) {
      firebase.getData(uid, PROFILE).then((snapshot) => {
        const { userBio } = snapshot.val() || {};
        setBio(userBio);
      });
    }
  }, [uid]);

  const handleClick = () => {
    const location = {
      pathname: ROUTES.PROFILE_EDIT,
      state: {
        name: name || "",
        bio,
        email,
        photoURL: photoURL || profileImgFallback,
      },
    };
    history.push(location);
  };

  return (
    <TopLayout>
      <h1>Profile</h1>
      <ProfileCard profileImg={photoURL || profileImgFallback}>
        <ProfileCard.Slot name="topContainer">
          <p className={style.info}>{name || "Anonymous"}</p>
          <p className={style.info}>{email}</p>
        </ProfileCard.Slot>
        <ProfileCard.Slot name="midContainer">
          <p className={style.bio}>{bio}</p>
        </ProfileCard.Slot>
        <ProfileCard.Slot name="bottomContainer">
          <Button text="Edit" handleClick={handleClick} />
        </ProfileCard.Slot>
      </ProfileCard>
    </TopLayout>
  );
};

export default Profile;
