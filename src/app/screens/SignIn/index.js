import React, { useReducer, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "firebaseUtils";
import * as ROUTES from "constants/routes";
import { actionCreator, handleChange } from "utils";
import Input from "components/Input";
import { SubmitButton } from "components/Button";
import Warning from "components/Warning";
import Layout from "components/Layouts";

// add authenticated route

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

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.HOME);
      })
      .catch((error) => dispatch(errorType(error)));
  };

  const { email, password, error } = state;
  const isInvalid = email === "" || password === "";

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={email}
          placeholder="email"
          onChange={handleChange(actionType.SET_EMAIL, dispatch)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange(actionType.SET_PASSWORD, dispatch)}
        />
        {error && <Warning text={error.message} />}
        <SubmitButton disabled={isInvalid} text="Sign In" />
      </form>
    </Fragment>
  );
};

export default SignIn;
