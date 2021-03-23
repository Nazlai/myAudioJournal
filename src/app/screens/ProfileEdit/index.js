import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "firebaseUtils";
import { useAuth } from "session/authUser";
import useUpload from "utils/useUpload";
import { PROFILE } from "constants/firebase";
import * as ROUTES from "constants/routes";
import { TopLayout, ProfileCard, Input, TextArea, Button } from "components";
import style from "./profileEdit.module";

const ProfileEdit = () => {
  const fileRef = useRef(null);
  const history = useHistory();
  const firebase = useFirebase();
  const authUser = useAuth();
  const {
    location: { state },
  } = history;
  const { name, bio, email, photoURL } = state;
  const [profileName, setProfileName] = useState(name);
  const [profileBio, setProfileBio] = useState(bio);
  const [file, setFile] = useState("");
  const { _, url } = useUpload(firebase.doCreateChildRef(email), file);

  const handleClick = () => {
    const { uid } = authUser;
    const path = `${uid}/${PROFILE}`;
    const updateUserPhoto = url.fullPath || photoURL;
    const storagePayload = {
      userName: profileName,
      email: email,
      userBio: profileBio,
      userPhoto: updateUserPhoto,
    };
    const profilePayload = {
      displayName: profileName,
      photoURL: updateUserPhoto,
    };

    Promise.all([
      firebase.setUserData(path, storagePayload),
      firebase.doUpdateUserProfile(profilePayload),
    ]).then(() => history.push(ROUTES.PROFILE));
  };

  return (
    <TopLayout>
      <h1>Profile</h1>
      <ProfileCard profileImg={url.fullPath || photoURL}>
        <ProfileCard.Slot name="topContainer">
          <Input
            onChange={(event) => setProfileName(event.target.value)}
            value={profileName}
            placeholder="display name"
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
            placeholder="bio"
          />
        </ProfileCard.Slot>
        <ProfileCard.Slot name="bottomContainer">
          <Button
            text="Cancel"
            handleClick={() => history.push(ROUTES.PROFILE)}
          />
          <Button
            text="Save"
            disabled={profileName === "" || profileBio === ""}
            handleClick={handleClick}
          />
        </ProfileCard.Slot>
      </ProfileCard>
    </TopLayout>
  );
};

export default ProfileEdit;
