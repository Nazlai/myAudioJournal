import React, { useContext } from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { normalizeUser } from "utils";
import { VERIFY_EMAIL_REDIRECT_URL } from "constants/firebase";

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

export const FirebaseContext = React.createContext(null);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.storage = app.storage();
    this.database = app.database();
    this.storageRef = this.storage.ref();
    this.databaseRef = this.database.ref();
  }

  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    return this.auth.currentUser.updatePassword(password);
  }

  doUpdateUserProfile(payload) {
    const user = this.auth.currentUser;
    return user.updateProfile(payload);
  }

  doSendVerificationEmail() {
    return this.auth.currentUser.sendEmailVerification({
      url: VERIFY_EMAIL_REDIRECT_URL,
    });
  }

  doCreateChildRef(fileName) {
    return this.storageRef.child(fileName);
  }

  createPost(path, payload) {
    const dbPostRef = this.databaseRef.child(path);
    const newPostRef = dbPostRef.push();
    return newPostRef.set(payload);
  }

  doDeletePost(path) {
    return this.databaseRef.child(path).set(null);
  }

  doDeleteFile(path) {
    return this.storageRef.child(path).delete();
  }

  setUserData(path, payload) {
    const dbPostRef = this.databaseRef.child(path);
    return dbPostRef.set(payload);
  }

  getData(uid, path) {
    return this.databaseRef.child(uid).child(path).get();
  }

  getStorageItem(path) {
    return this.storageRef.child(path).getDownloadURL();
  }

  getUser() {
    const userData = this.auth.currentUser;
    return userData ? normalizeUser(this.auth.currentUser) : {};
  }
}

export default Firebase;
