import React, { useContext } from "react";
import useAuthenticate from "utils/useAuthenticate";

export const AuthUserContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthUserContext);
};

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [authUser] = useAuthenticate();

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return WithAuthentication;
};

export default withAuthentication;
