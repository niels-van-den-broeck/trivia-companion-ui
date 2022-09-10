import React, { useCallback, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";

import { loginCallback, LOGIN_API_TYPES } from "@api/login";

import Storage from "@utils/storage";

type User = LOGIN_API_TYPES["callback"];

const AuthContext = React.createContext<{
  user?: User;
  idToken: string | undefined;
  signOut: () => void | Promise<void>;
}>({
  user: undefined,
  idToken: undefined,
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [idToken, setIdToken] = useState<string>();

  const signOut = useCallback(async () => {
    await firebase.auth().signOut();
    setUser(undefined);
    setIdToken(undefined);
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          setIdToken(undefined);
          setUser(undefined);

          return;
        }

        const idToken = await user.getIdToken(true);

        try {
          const data = await loginCallback(idToken);

          setUser(data);
          setIdToken(idToken);
        } catch (e) {
          console.log(e);
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [setIdToken, setUser]);

  useEffect(() => {
    idToken
      ? Storage.set("trivia-access-token", idToken)
      : Storage.remove("trivia-access-token");
  }, [idToken]);

  return (
    <AuthContext.Provider value={{ user, idToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthentication() {
  const contextValue = useContext(AuthContext);

  return contextValue;
}
