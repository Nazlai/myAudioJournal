import React from "react";
import { TopLayout } from "components/Layouts";
import { useFirebase } from "firebaseUtils";
import style from "./profile.module";
import { PROFILE } from "constants/firebase";
import { useAuth } from "session/authUser";

const Wrapper = ({ name, val }) => (
  <div>
    <span>{name}: </span>
    <span>{val}</span>
  </div>
);

const Profile = () => {
  const firebase = useFirebase();
  const authUser = useAuth();
  const handleClick = () => {
    const { uid } = authUser;
    const path = `${uid}/${PROFILE}`;
    const payload = {
      hello: "world",
      desc: "123",
    };
    firebase.setUserData(path, payload);
  };

  return (
    <TopLayout>
      <h1>Profile</h1>
      <div className={style.userPhoto}></div>
      <Wrapper name="name" val="henry" />
      <Wrapper name="email" val="henry@gmail.com" />
      <button onClick={handleClick}>send</button>
    </TopLayout>
  );
};

export default Profile;
