import { useState, useEffect } from "react";
import { useFirebase } from "firebaseUtils";
import { normalizeUser } from "utils";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const firebase = useFirebase();

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
