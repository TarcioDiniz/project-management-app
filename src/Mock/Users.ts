import {IUser} from "../model/IUser.ts";
import {ProfileType} from "../shared/enums/ProfileType.ts";

const Users: IUser[] = [
  {
    id: 1,
    email: "teacher@example.com",
    password: "password123",
    profile: ProfileType.TEACHER,
  },
  {
    id: 2,
    email: "intern@example.com",
    password: "intern123",
    profile: ProfileType.INTERN,
  },
  {
    id: 3,
    email: "junior@example.com",
    password: "junior123",
    profile: ProfileType.JUNIOR,
  },
  {
    id: 4,
    email: "senior@example.com",
    password: "senior123",
    profile: ProfileType.SENIOR,
  },
  {
    id: 5,
    email: "master@example.com",
    password: "master123",
    profile: ProfileType.MASTER,
  },
];

export default Users;
