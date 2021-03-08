import React from "react";
import { render } from "react-dom";
import App from "app/app";
import Firebase, { FirebaseContext } from "firebaseUtils";
import "normalize.css";
import "styles/app";

const root = document.getElementById("root");

render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  root
);
