import {AuthProvider} from "./shared/context/Auth";
import Layouts from "./shared/layouts";
import {useEffect} from "react";
import Users from "./Mock/Users.ts";

const USERS_KEY = "users";

function App() {

  useEffect(() => {
    const usersString = localStorage.getItem(USERS_KEY);
    if (usersString) {
      const users = JSON.parse(usersString);
      if (!users || users.length === 0) {
        localStorage.setItem(USERS_KEY, JSON.stringify(Users));
        console.log('Default users generated and saved to Local Storage.');
      }
    }
  }, []);


  return (
    <AuthProvider>
      <Layouts/>
    </AuthProvider>
  )
}

export default App
