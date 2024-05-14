import AuthContext from "../context/Auth";
import {useContext} from "react";
import Header from "./layout-private/header";
import Router from "../routes";

const Layouts = () => {

  const {isAuth} = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        <>
          <Header/>
          <Router/>
        </>
      ) : <Router/>
      }
    </>
  );
}

export default Layouts;