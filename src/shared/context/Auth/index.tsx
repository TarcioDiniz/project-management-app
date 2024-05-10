import {createContext, ReactNode} from "react";
import {IAuthContext} from "../../../model/IAuthContext.ts";
import useAuth from "../../../hooks/useAuth";

const initialAuthContext: IAuthContext = {
  isAuth: false,
  user: {email: "", password: ""}
};

const AuthContext = createContext<IAuthContext>(initialAuthContext);


interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const {user, isAuth} = useAuth();

  return (
    <AuthContext.Provider value={{user, isAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};