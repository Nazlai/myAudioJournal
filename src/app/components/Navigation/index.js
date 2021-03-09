import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";
import { AuthUserContext } from "session/authUser";
import { FirebaseContext } from "firebaseUtils";
import styles from "./navigation.module";
import Overlay from "components/Overlay";

// needs styling
// replace text with icons
// replace profile with onClick display overlay

const OverlayItem = ({ children }) => (
  <div className={styles.overlay}>{children}</div>
);

const SignOutButton = ({ handleClick }) => {
  const firebase = useContext(FirebaseContext);
  const onClick = () => {
    firebase.doSignOut();
    handleClick();
  };

  return <a onClick={onClick}>Sign Out</a>;
};

const Navigation = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <nav className={styles.container}>
      <ul className={styles.nav}>
        {authUser ? <PrivateNavigation /> : <PublicNavigation />}
      </ul>
    </nav>
  );
};

const PublicNavigation = () => {
  return (
    <Fragment>
      <li>
        <Link to={ROUTES.SIGN_IN}>MAJ</Link>
      </li>
    </Fragment>
  );
};

const PrivateNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <li>
        <Link to={ROUTES.HOME}>MAJ</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>
          <i className="fas fa-home"></i>
        </Link>
      </li>
      <li>
        <Link to={ROUTES.CREATE_POST}>
          <i className="fas fa-book-open"></i>
        </Link>
      </li>
      <li>
        <a onClick={() => setOpen(!open)}>
          <i className="fas fa-user"></i>
        </a>
      </li>
      {open && (
        <Overlay handleClose={() => setOpen(false)}>
          <OverlayItem>
            <Link to={ROUTES.PROFILE} onClick={() => setOpen(false)}>
              Profile
            </Link>
          </OverlayItem>
          <OverlayItem>
            <SignOutButton handleClick={() => setOpen(false)} />
          </OverlayItem>
        </Overlay>
      )}
    </Fragment>
  );
};

export default Navigation;
