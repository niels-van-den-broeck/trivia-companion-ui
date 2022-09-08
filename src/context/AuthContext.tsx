import React, { Dispatch, SetStateAction, useContext, useState } from "react";

import { LOGIN_API_TYPES } from "@api/login";

type User = LOGIN_API_TYPES['callback'];

const AuthContext = React.createContext<{
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  idToken: string | undefined;
  setIdToken: Dispatch<SetStateAction<string | undefined>>;
}>({
  user: undefined,
  setUser: () => {},
  idToken: undefined,
  setIdToken: () => {},
});

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [idToken, setIdToken] = useState<string>();
  return (
    <AuthContext.Provider value={{ user, setUser, idToken, setIdToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthentication() {
  const contextValue = useContext(AuthContext);

  return contextValue;
}
