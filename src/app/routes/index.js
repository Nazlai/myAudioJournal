import React from "react";
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "constants/routes";
import {
  CreatePost,
  EditPost,
  Feed,
  Journal,
  Profile,
  SignIn,
  SignUp,
  NotFound,
  PasswordReset,
} from "screens";
import PrivateRoute from "components/PrivateRoute";
import AuthenticatedRoute from "components/AuthenticatedRoute";

// TODO 3/10
// reconsider landing, is it necessary?

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LANDING}></Route>
      <PrivateRoute path={ROUTES.HOME}>
        <Feed />
      </PrivateRoute>
      <AuthenticatedRoute path={ROUTES.SIGN_IN}>
        <SignIn />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.SIGN_UP}>
        <SignUp />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.PASSWORD_RESET}>
        <PasswordReset />
      </AuthenticatedRoute>
      <PrivateRoute path={ROUTES.PROFILE}>
        <Profile />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.JOURNAL}>
        <Journal />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.CREATE_POST}>
        <CreatePost />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.EDIT_POST}>
        <EditPost />
      </PrivateRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
