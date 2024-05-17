import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../../pages/session/login";
import ProtectedRoute from "./ProtectedRoute";
import Project from "../../pages/private/project";
import {useContext} from "react";
import AuthContext from "../context/Auth";
import Teams from "../../pages/private/teams";

const Router = () => {
  const authContext = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/"/>}/>
      {authContext && authContext.isAuth ? (
        <Route path="/login" element={<Navigate to="/"/>}/>
      ) : (
        <Route path="/login" element={<Login/>}/>
      )}
      <Route
        path="/"
        element={
          <ProtectedRoute isPrivate>
            <Project/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <ProtectedRoute isPrivate>
            <Teams/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;
