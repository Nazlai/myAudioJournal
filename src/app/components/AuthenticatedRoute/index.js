import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "constants/routes";
import useAuthenticate from "utils/useAuthenticate";

const defaultCondition = (value) => !!value;

const AuthenticatedRoute = ({
  children,
  condition = defaultCondition,
  ...options
}) => {
  const [loading, authUser] = useAuthenticate();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Route {...options}>
      {!condition(authUser) ? children : <Redirect to={ROUTES.HOME} />}
    </Route>
  );
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.func,
};

export default AuthenticatedRoute;
