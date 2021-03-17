import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "constants/routes";
import useAuthenticate from "utils/useAuthenticate";
import { defaultCondition } from "utils";
import Spinner from "components/Spinner";
import Layout from "components/Layouts";

const AuthenticatedRoute = ({
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
      {!condition(authUser) ? children : <Redirect to={ROUTES.LANDING} />}
    </Route>
  );
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.func,
};

export default AuthenticatedRoute;
