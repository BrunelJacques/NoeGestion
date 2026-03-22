import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/* 

// méthode simple
export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // ✅ conservé
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
 */

// idem mais plus évoluée
import { useLocation } from "react-router-dom";
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}   // pour le retour à l'initial demandé après login
      />
    );
  }

  return <Outlet />;
}
/* 
// original version Auth

import type { JSX } from "react";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return user ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
 */



