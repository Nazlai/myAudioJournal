import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
} from "screens";
import Navigation from "components/Navigation";
import withAuthentication from "session/authUser";
import PrivateRoute from "components/PrivateRoute";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import Layout from "components/Layouts";

const App = () => (
  <Router>
    <Navigation />
    <Layout>
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
    </Layout>
  </Router>
);

export default withAuthentication(App);
