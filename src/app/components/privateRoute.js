import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const PrivateRoute = ({ children, ...options }) => (
  <Route {...options}>{children}</Route>
);

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
