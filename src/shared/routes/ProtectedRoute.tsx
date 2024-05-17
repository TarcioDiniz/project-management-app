import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/Auth";

interface ProtectedRouteProps {
  children: ReactNode;
  isPrivate?: boolean;
}

const ProtectedRoute = ({ children, isPrivate = false }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (authContext) {
    const { isAuth } = authContext;

    if (!isAuth && isPrivate) {
      return <Navigate to="/login" />;
    }

    if (isAuth && !isPrivate) {
      return <Navigate to="/" />;
    }

    if (isAuth && isPrivate) {
      return children;
    }
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
