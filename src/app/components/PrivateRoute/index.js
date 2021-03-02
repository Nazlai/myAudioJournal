import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from "session/authUser";
import { SIGN_IN } from "constants/routes";

const defaultCondition = (value) => !!value;

const PrivateRoute = ({
  children,
  condition = defaultCondition,
  ...options
}) => {
  const authUser = useContext(AuthUserContext);

  return (
    <Route {...options}>
      {!condition(authUser) ? <Redirect to={SIGN_IN} /> : children}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.func,
};

export default PrivateRoute;
