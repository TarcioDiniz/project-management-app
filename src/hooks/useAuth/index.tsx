import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IUser} from "../../model/IUser.ts";
import {ILogin} from "../../model/ILogin.ts";

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser>({email: "", password: ""});

  const handleLogin = async (values: ILogin) => {
    try {
      console.log(values);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {

    try {
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
}

export default useAuth;