import {ReactNode, useContext} from "react";
import {AuthContext} from "../context/Auth";
import {Navigate} from "react-router-dom";

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