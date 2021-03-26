import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "firebaseUtils";
import * as ROUTES from "constants/routes";
import { actionCreator, handleChange } from "utils";
import { Input, SubmitButton, Warning, Layout, Form } from "components";
import style from "./signUp.module";

const SignUp = () => (
  <Layout>
    <h1>Sign Up</h1>
    <SignUpForm />
  </Layout>
);

const actionType = {
  SIGNUP_SUCCESS: "SIGN_UP_SUCCESS",
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD_ONE: "SET_PASSWORD_ONE",
  SET_PASSWORD_TWO: "SET_PASSWORD_TWO",
  SET_ERROR: "SET_ERROR",
};

const initialState = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: "",
};

const signUpReducer = (state, action) => {
  switch (action.type) {
    case actionType.SIGNUP_SUCCESS:
      return initialState;
    case actionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionType.SET_PASSWORD_ONE:
      return { ...state, passwordOne: action.payload };
    case actionType.SET_PASSWORD_TWO:
      return { ...state, passwordTwo: action.payload };
    case actionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const SignUpForm = () => {
  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const history = useHistory();
  const firebase = useFirebase();

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorType = actionCreator(actionType.SET_ERROR);

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        dispatch({ type: actionType.SIGNUP_SUCCESS });
        history.push(ROUTES.VERIFY_EMAIL);
      })
      .catch((error) => dispatch(errorType(error)));
  };

  const { email, passwordOne, passwordTwo, error } = state;

  const isInvalid =
    email === "" ||
    passwordOne === "" ||
    passwordTwo === "" ||
    passwordOne !== passwordTwo;

  return (
    <Form handleSubmit={handleSubmit} centerContent={true}>
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleChange(actionType.SET_EMAIL, dispatch)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={passwordOne}
        onChange={handleChange(actionType.SET_PASSWORD_ONE, dispatch)}
      />
      <Input
        type="password"
        placeholder="Confirm password"
        value={passwordTwo}
        onChange={handleChange(actionType.SET_PASSWORD_TWO, dispatch)}
      />
      {error && <Warning text={error.message} />}
      <div className={style.bottomContainer}>
        <SubmitButton disabled={isInvalid} text="Sign Up" />
      </div>
    </Form>
  );
};

export default SignUp;
