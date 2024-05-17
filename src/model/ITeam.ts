import {IProject} from "./IProject.ts";
import {IUser} from "./IUser.ts";

export interface ITeam {
  id: number;
  name: string;
  members: IUser[];
  project: IProject | null;
}