import { useState } from "react";
import { IUser } from "../../model/IUser";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AUTH_KEY = "auth";
const USERS_KEY = "users";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const login = (userData: IUser) => {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const registeredUser = users.find((u: IUser) => u.email === userData.email);
      if (registeredUser && registeredUser.password === userData.password) {
        setUser(registeredUser);
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_KEY, JSON.stringify(registeredUser));
        navigate("/");
      } else {
        toast.error("Usuário não cadastrado ou senha incorreta.");
        //console.error("Usuário não cadastrado ou senha incorreta.");
      }
    } else {
      toast.error("Nenhum usuário cadastrado.");
      console.error("Nenhum usuário cadastrado.");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const checkAuthStatus = () => {
    const storedUser = localStorage.getItem(AUTH_KEY);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuthStatus,
  };
};

export default useAuth;
