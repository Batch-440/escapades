import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "@/types/model/user";

type AuthState = {
  user: User | null;
  token: string | null;
};

type T = {
  auth: AuthState;
  setAuth: (newAuth: AuthState) => void;
};

const AuthContext = createContext<T>({} as T);

const AuthProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const initialState = {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "",
    token: localStorage.getItem("token"),
  };
  // State to hold the authentication token
  const [auth, setAuth_] = useState<AuthState>(initialState);

  // Function to set the authentication token
  const setAuth = (newState: AuthState) => {
    setAuth_(newState);
  };

  useEffect(() => {
    if (auth.token && auth.user) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
      localStorage.setItem("token", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [auth]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
