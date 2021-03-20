import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "components";
import Routes from "routes";
import withAuthentication from "session/authUser";

const App = () => (
  <Router>
    <Navigation />
    <Routes />
  </Router>
);

export default withAuthentication(App);
