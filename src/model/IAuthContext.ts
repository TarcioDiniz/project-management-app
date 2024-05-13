import {IUser} from "./IUser.ts";
import {ILogin} from "./ILogin.ts";

export interface IAuthContext {
  isAuth: boolean
  user: IUser
  handleLogin: (values: ILogin) => void;
  handleLogout: () => void;
}