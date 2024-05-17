import {useState} from "react";
import {IUser} from "../../model/IUser.ts";

const USERS_KEY = "users";

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>(() => {
    const storedUsers = localStorage.getItem(USERS_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const saveUsers = (users: IUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUsers(users);
  };

  const addUser = (user: IUser) => {
    const updatedUsers = [...users, user];
    saveUsers(updatedUsers);
  };

  const updateUser = (updatedUser: IUser) => {
    const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    saveUsers(updatedUsers);
  };

  const deleteUser = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    saveUsers(updatedUsers);
  };

  return {
    users,
    addUser,
    updateUser,
    deleteUser
  };
};

export default useUsers;
