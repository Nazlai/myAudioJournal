import React, { useReducer, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "firebaseUtils";
import * as ROUTES from "constants/routes";
import { actionCreator, handleChange } from "utils";
import Input from "components/Input";
import { SubmitButton } from "components/Button";
import Warning from "components/Warning";
import Layout from "components/Layouts";

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
  const firebase = useContext(FirebaseContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorType = actionCreator(actionType.SET_ERROR);

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        dispatch({ type: actionType.SIGNUP_SUCCESS });
        history.push(ROUTES.HOME);
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
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={handleChange(actionType.SET_EMAIL, dispatch)}
        />
        <Input
          type="password"
          placeholder="password"
          value={passwordOne}
          onChange={handleChange(actionType.SET_PASSWORD_ONE, dispatch)}
        />
        <Input
          type="password"
          placeholder="confirm password"
          value={passwordTwo}
          onChange={handleChange(actionType.SET_PASSWORD_TWO, dispatch)}
        />
        {error && <Warning text={error.message} />}

        <SubmitButton disabled={isInvalid} text="Sign Up" />
      </form>
    </Fragment>
  );
};

export default SignUp;
