import {createContext, ReactNode} from "react";
import {IAuthContext} from "../../../model/IAuthContext.ts";
import useAuth from "../../../hooks/useAuth";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const {user, isAuth, handleLogin, handleLogout} = useAuth();

  return (
    <AuthContext.Provider value={{isAuth, user, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};