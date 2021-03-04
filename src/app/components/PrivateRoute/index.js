import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "constants/routes";
import useAuthenticate from "utils/useAuthenticate";

const defaultCondition = (value) => !!value;

const PrivateRoute = ({
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
      {!condition(authUser) ? <Redirect to={ROUTES.SIGN_IN} /> : children}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.func,
};

export default PrivateRoute;
