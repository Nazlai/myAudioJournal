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
  Landing,
  EmailVerification,
  ProfileEdit,
} from "screens";
import { AuthenticatedRoute, PrivateRoute } from "components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LANDING}>
        <Landing />
      </Route>
      <PrivateRoute path={ROUTES.HOME}>
        <Feed />
      </PrivateRoute>
      <AuthenticatedRoute path={ROUTES.SIGN_IN} condition={(x) => x.uid}>
        <SignIn />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.SIGN_UP} condition={(x) => x.uid}>
        <SignUp />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.PASSWORD_RESET}>
        <PasswordReset />
      </AuthenticatedRoute>
      <PrivateRoute
        path={ROUTES.VERIFY_EMAIL}
        condition={(x) => x.uid && !x.emailVerified}
      >
        <EmailVerification />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.PROFILE}>
        <Profile />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.PROFILE_EDIT}>
        <ProfileEdit />
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
