import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "constants/routes";
import useAuthenticate from "utils/useAuthenticate";
import { defaultCondition } from "utils";
import Spinner from "components/Spinner";

const AuthenticatedRoute = ({
  children,
  condition = defaultCondition,
  ...options
}) => {
  const [loading, authUser] = useAuthenticate();

  if (loading) {
    return <Spinner />;
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
