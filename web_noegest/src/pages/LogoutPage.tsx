// LogoutPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/home", { replace: true });
  }, [logout, navigate]);

  return <div>Logging out…</div>;
};

export default LogoutPage;
