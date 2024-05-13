import {createContext, ReactNode} from "react";
import {IAuthContext} from "../../../model/IAuthContext.ts";
import useAuth from "../../../hooks/useAuth";

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  user: {email: "", password: ""},
  handleLogin: () => {
  },
  handleLogout: () => {
  }
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const {user, isAuth, handleLogin, handleLogout} = useAuth();

  return (
    <AuthContext.Provider value={{user, isAuth, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider}
export default AuthContext;