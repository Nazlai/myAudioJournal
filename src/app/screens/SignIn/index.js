import React, { useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "firebaseUtils";
import * as ROUTES from "constants/routes";
import {
  actionCreator,
  handleChange,
  normalizeUser,
  isUserUniqueAndVerified,
} from "utils";
import { Input, SubmitButton, Warning, Layout, Form } from "components";
import style from "./signIn.module.scss";

const PasswordReset = () => {
  return <Link to={ROUTES.PASSWORD_RESET}>Forget Password?</Link>;
};

const SignIn = () => (
  <Layout>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordReset />
    <SignUpLink />
  </Layout>
);

const SignUpLink = () => (
  <p>
    Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
  </p>
);

const initialState = {
  email: "",
  password: "",
  error: "",
};

const actionType = {
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  SET_ERROR: "ERROR",
};

const signInReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionType.SET_PASSWORD:
      return { ...state, password: action.payload };
    case actionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const SignInForm = () => {
  const [state, dispatch] = useReducer(signInReducer, initialState);
  const firebase = useFirebase();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorType = actionCreator(actionType.SET_ERROR);
    const userEmail = email.trim();

    firebase
      .doSignInWithEmailAndPassword(userEmail, password)
      .then((snapShot) => {
        if (isUserUniqueAndVerified(normalizeUser(snapShot.user))) {
          history.push(ROUTES.HOME);
        } else {
          history.push(ROUTES.VERIFY_EMAIL);
        }
      })
      .catch((error) => dispatch(errorType(error)));
  };

  const { email, password, error } = state;
  const isInvalid = email === "" || password === "";

  return (
    <Form handleSubmit={handleSubmit} centerContent={true}>
      <Input
        type="text"
        value={email}
        placeholder="Email"
        onChange={handleChange(actionType.SET_EMAIL, dispatch)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleChange(actionType.SET_PASSWORD, dispatch)}
      />
      {error && <Warning text={error.message} />}
      <div className={style.bottomContainer}>
        <SubmitButton disabled={isInvalid} text="Sign In" />
      </div>
    </Form>
  );
};

export default SignIn;
