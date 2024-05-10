import {IUser} from "./IUser.ts";

export interface IAuthContext {
  isAuth: boolean
  user: IUser
}