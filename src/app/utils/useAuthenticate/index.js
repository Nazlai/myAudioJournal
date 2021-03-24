import { useState, useEffect } from "react";
import { useFirebase } from "firebaseUtils";
import { normalizeUser, assignRole } from "utils";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const firebase = useFirebase();

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userData = assignRole(normalizeUser(authUser));
        setAuthUser(userData);
      } else {
        setAuthUser({});
      }
      setLoading(false);
    });
    return listener;
  }, []);

  return [authUser, loading];
};

export default useAuthenticate;
