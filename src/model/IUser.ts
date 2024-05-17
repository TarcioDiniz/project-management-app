import {ProfileType} from "../shared/enums/ProfileType.ts";

export interface IUser {
  id: number;
  email: string;
  password: string;
  profile: ProfileType;
}