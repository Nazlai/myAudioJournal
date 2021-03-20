import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";
import { useAuth } from "session/authUser";
import { useFirebase } from "firebaseUtils";
import style from "./navigation.module";
import { Overlay, Layout } from "components";
import ROLES from "constants/roles";

// TODO 3/17
// youve removed the route ui for unverified_users
// need to handle the route component too

const OverlayItem = ({ children }) => (
  <div className={style.overlay}>{children}</div>
);

const SignOutButton = ({ handleClick }) => {
  const firebase = useFirebase();
  const onClick = () => {
    firebase.doSignOut();
    handleClick();
  };

  return <a onClick={onClick}>Sign Out</a>;
};

const getNav = (user) => {
  return (
    {
      [ROLES.FULL_USER]: PrivateNavigation,
      [ROLES.UNVERIFIED_USER]: PrivateNavigation,
      [ROLES.VISITOR]: PublicNavigation,
    }[user.role] || PublicNavigation
  );
};

export const Navigation = () => {
  const authUser = useAuth();
  const Nav = getNav(authUser);

  return (
    <nav className={style.container}>
      <ul className={style.nav}>
        <Nav user={authUser} />
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

const PrivateNavigation = ({ user }) => {
  const [open, setOpen] = useState(false);
  const isFullUser = user.role.includes(ROLES.FULL_USER);
  const route = isFullUser ? ROUTES.LANDING : ROUTES.VERIFY_EMAIL;

  return (
    <Fragment>
      <li>
        <Link to={route}>MAJ</Link>
      </li>
      {isFullUser ? (
        <Fragment>
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
        </Fragment>
      ) : null}

      <li>
        <a onClick={() => setOpen(!open)}>
          <i className="fas fa-user"></i>
        </a>
      </li>
      {open ? (
        <Overlay handleClose={() => setOpen(false)}>
          <div className={style.overlayProfile}>
            <div className={style.closeBtn}>
              <i className="fas fa-times" onClick={() => setOpen(false)}></i>
            </div>
            <Layout>
              {isFullUser ? (
                <OverlayItem>
                  <Link to={ROUTES.PROFILE} onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                </OverlayItem>
              ) : null}
              <OverlayItem>
                <SignOutButton handleClick={() => setOpen(false)} />
              </OverlayItem>
            </Layout>
          </div>
        </Overlay>
      ) : null}
    </Fragment>
  );
};
