import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IUser} from "../../model/IUser.ts";
import {ILogin} from "../../model/ILogin.ts";

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser>({email: "", password: ""});

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      handleLogin(JSON.parse(authToken));
    }

  }, [])

  const handleLogin = async (values: ILogin) => {
    try {
      localStorage.setItem("authToken", JSON.stringify(values));
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      setIsAuth(false);
      setUser({email: "", password: ""});
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isAuth,
    user,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
