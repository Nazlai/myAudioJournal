import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";

// needs styling
// replace text with icons
// replace profile with onClick display overlay

const Navigation = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>MAJ</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.CREATE_POST}>Create</Link>
    </li>
    <li>
      <Link to={ROUTES.PROFILE}>profile</Link>
    </li>
  </ul>
);

export default Navigation;
