import AuthContext from "../context/Auth";
import {useContext} from "react";
import Header from "./layout-private/header";
import Router from "../routes";

const Layouts = () => {

  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext && authContext.isAuth ? (
        <>
          <Header/>
          <Router/>
        </>
      ) : (
        <Router/>
      )}
    </>
  );
}

export default Layouts;