import {ReactNode, useContext} from "react";
import {Navigate} from "react-router-dom";
import AuthContext from "../context/Auth";

interface ProtectedRouteProps {
  children: ReactNode
  isPrivate?: boolean;
}

const ProtectedRoute = ({
                          children,
                          isPrivate = false,
                        }: ProtectedRouteProps) => {
  const {isAuth} = useContext(AuthContext);

  if (!isAuth && isPrivate) {
    return <Navigate to="/login"/>;
  }

  if (isAuth && !isPrivate) {
    return <Navigate to="/"/>;
  }

  return children;
};

export default ProtectedRoute;