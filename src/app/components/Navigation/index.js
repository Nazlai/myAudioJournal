import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";
import { AuthUserContext } from "session/authUser";
import { FirebaseContext } from "firebaseUtils";
import Button from "components/Button";
import styles from "./navigation.module";

// needs styling
// replace text with icons
// replace profile with onClick display overlay

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);
  const handleClick = () => firebase.doSignOut();

  return <Button handleClick={handleClick} text="Sign Out" />;
};

const Navigation = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <nav className={styles.container}>
      <ul className={styles.nav}>
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
          <Link to={ROUTES.PROFILE}>
            <i className="fas fa-user"></i>
          </Link>
        </li>
        {authUser && <SignOutButton />}
      </ul>
    </nav>
  );
};

export default Navigation;
