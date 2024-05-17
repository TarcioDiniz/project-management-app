import React, {createContext, useEffect} from "react";
import {IAuthContext} from "../../../model/IAuthContext.ts";
import useAuth from "../../../hooks/useAuth";

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const auth = useAuth();

  useEffect(() => {
    auth.checkAuthStatus();
  }, [auth]);

  const authContextValue: IAuthContext = {
    isAuth: auth.isAuthenticated,
    user: auth.user,
    handleLogin: auth.login,
    handleLogout: auth.logout
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export {AuthProvider};
export default AuthContext;
