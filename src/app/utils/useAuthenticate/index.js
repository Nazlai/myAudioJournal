import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "firebaseUtils";
import { normalizeUser } from "utils";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(normalizeUser(authUser));
        setLoading(false);
      } else {
        setAuthUser(false);
        setLoading(false);
      }
    });
    return listener;
  }, [firebase]);

  return [loading, authUser];
};

export default useAuthenticate;
