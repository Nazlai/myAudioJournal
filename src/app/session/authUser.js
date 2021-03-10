import React, { useState, useEffect, useContext } from "react";
import { normalizeUser } from "utils";
import { useFirebase } from "firebaseUtils";

export const AuthUserContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthUserContext);
};

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useFirebase();

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
