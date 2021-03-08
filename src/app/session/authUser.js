import React, { useState, useEffect, useContext } from "react";
import { normalizeUser } from "utils";
import { FirebaseContext } from "firebaseUtils";

export const AuthUserContext = React.createContext(null);

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged((authUser) =>
        authUser ? setAuthUser(normalizeUser(authUser)) : setAuthUser(null)
      );
      return listener;
    }, [firebase]);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return WithAuthentication;
};

export default withAuthentication;
