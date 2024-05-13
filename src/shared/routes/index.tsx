import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../../pages/session/login";
import {AuthProvider} from "../context/Auth";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Navigate to="/"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={
          <ProtectedRoute isPrivate>
            <Login/>
          </ProtectedRoute>
        }/>
      </Routes>
    </AuthProvider>
  );
}

export default Router;
