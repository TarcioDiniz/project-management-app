import {IUser} from "./IUser.ts";
import {ILogin} from "./ILogin.ts";

export interface IAuthContext {
  isAuth: boolean;
  user: IUser | null;
  handleLogin: (userData: ILogin) => void; // Update parameter type to IUser
  handleLogout: () => void;
}