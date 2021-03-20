import React, { useRef, useState, useEffect, Children } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import useUpload from "utils/useUpload";
import { PROFILE } from "constants/firebase";
import { TopLayout, Button, Input, TextArea } from "components";
import style from "./profile.module";

// TODO 3/20
// break edit/view into separate components

const profileImgFallback =
  "https://images.pexels.com/photos/3312275/pexels-photo-3312275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const ProfileCard = ({ children, profileImg }) => {
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

// TODO 3/17
// handle null auth
const Profile = () => {
  const firebase = useFirebase();
  const authUser = useAuth();
  const fileRef = useRef(null);
  const [image, setImage] = useState(profileImgFallback);
  const [bio, setBio] = useState("");
  const { name, email = "", uid } = authUser;
  const [isEdit, setIsEdit] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  // TODO 3/20 fetch bio and profileImg from storage
  const [file, setFile] = useState("");
  const { _, url } = useUpload(firebase.doCreateChildRef(email), file);

  useEffect(() => {
    if (uid) {
      firebase.getData(uid, PROFILE).then((snapshot) => {
        const { userBio, userPhoto } = snapshot.val();
        setBio(userBio);
        firebase.getStorageItem(userPhoto).then((url) => setImage(url));
      });
    }
  }, [uid]);

  const handleClick = () => {
    const { uid } = authUser;
    const path = `${uid}/${PROFILE}`;
    const payload = {
      userBio: profileBio,
      userPhoto: url.fullPath,
    };
    firebase.setUserData(path, payload).then(() => setIsEdit(false));
  };

  return (
    <TopLayout>
      <h1>Profile</h1>
      {isEdit ? (
        <ProfileCard profileImg={image}>
          <ProfileCard.Slot name="topContainer">
            <Input
              onChange={(event) => setProfileName(event.target.value)}
              value={profileName}
            />
            <label>
              Change Image
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                className={style.upload}
                onChange={(event) => {
                  event.preventDefault();
                  const file = fileRef.current.files[0];
                  setFile(file);
                }}
              />
            </label>
          </ProfileCard.Slot>
          <ProfileCard.Slot name="midContainer">
            <TextArea
              onChange={(event) => setProfileBio(event.target.value)}
              value={profileBio}
            />
          </ProfileCard.Slot>
          <ProfileCard.Slot name="bottomContainer">
            <Button text="Cancel" handleClick={() => setIsEdit(false)} />
            <Button
              text="Save"
              disabled={profileName === "" || profileBio === ""}
              handleClick={handleClick}
            />
          </ProfileCard.Slot>
        </ProfileCard>
      ) : (
        <ProfileCard profileImg={image}>
          <ProfileCard.Slot name="topContainer">
            <p className={style.info}>{name || "Anonymous"}</p>
            <p className={style.info}>{email}</p>
          </ProfileCard.Slot>
          <ProfileCard.Slot name="midContainer">
            <p>{bio}</p>
          </ProfileCard.Slot>
          <ProfileCard.Slot name="bottomContainer">
            <Button text="Edit" handleClick={() => setIsEdit(true)} />
          </ProfileCard.Slot>
        </ProfileCard>
      )}
    </TopLayout>
  );
};

export default Profile;
