import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "constants/routes";
import useAuthenticate from "utils/useAuthenticate";
import { defaultCondition } from "utils";
import { Spinner, Layout } from "components";

export const PrivateRoute = ({
  children,
  condition = defaultCondition,
  ...options
}) => {
  const [authUser, loading] = useAuthenticate();

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Route {...options}>
      {!condition(authUser) ? <Redirect to={ROUTES.SIGN_IN} /> : children}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.func,
};
