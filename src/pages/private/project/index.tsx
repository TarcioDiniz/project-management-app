import {useContext} from "react";
import AuthContext from "../../../shared/context/Auth";

const Project = () => {

  const {isAuth} = useContext(AuthContext);

  return (
    <div>
      {isAuth ? "true" : "false"}
    </div>
  );
}

export default Project;