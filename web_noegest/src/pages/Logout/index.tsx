// src/pages/Logout/index.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";

export default function Logout () {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Effacement user et tokens
    navigate("/home", { replace: true });
  }, [logout, navigate]);

  return <div>Logging out…</div>;
};

