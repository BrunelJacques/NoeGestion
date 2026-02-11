import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { JSX } from "react";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
