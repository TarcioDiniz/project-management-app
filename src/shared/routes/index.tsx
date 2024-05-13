import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../../pages/session/login";
import ProtectedRoute from "./ProtectedRoute";
import Project from "../../pages/private/project";

const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={
        <ProtectedRoute isPrivate>
          <Project/>
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default Router;
