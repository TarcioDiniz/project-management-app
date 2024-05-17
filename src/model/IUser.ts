import {ProfileType} from "../shared/enums/ProfileType.ts";

export interface IUser {
  id: number;
  name: string;
  photo?: string;
  email: string;
  password: string;
  profile: ProfileType;
}