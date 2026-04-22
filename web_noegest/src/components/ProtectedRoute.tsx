import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// méthode  évoluée sans React.FC et children, mais avec Outlet
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



