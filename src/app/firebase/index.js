import React, { useContext } from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

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

  doCreateChildRef(fileName) {
    return this.storageRef.child(fileName);
  }

  doUploadFile(fileName, file) {
    return this.doCreateChildRef(fileName).put(file);
  }

  createPost(path, payload) {
    const dbPostRef = this.databaseRef.child(path);
    const newPostRef = dbPostRef.push();
    return newPostRef.set(payload);
  }

  getData(uid, path) {
    return this.databaseRef.child(uid).child(path).get();
  }
}

export default Firebase;
