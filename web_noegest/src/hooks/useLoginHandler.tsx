// src/hooks/useLoginHandler.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useError } from "../contexts/ErrorContext.tsx";
import { useAuth } from "./useAuth";

export function useLoginHandler() {
  const { setError } = useError();
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation(); 
  // URL d'origine ou fallback vers "/"
  const from = location.state?.from || "/";
  const to = from === '/logout' ? '/home': from ; // Évite de rediriger vers /logout après déconnexion


  async function loginWithCredentials(username: string, password: string) {
    const result = await login(username, password);

    if (!result.success) {
      console.log("WWW  useLoginHandler")
      setError( 
        [
          "Échec de login. Vérifiez vos identifiants",
          result.error && `Détails : ${result.error}` || `Erreur inconnue.`
        ]
          .filter(Boolean)
          .join(" - ")   
        );
      return;
    }

    setError(""); // Clear any previous error
    navigate(to, { replace: true });
  }


  return { loginWithCredentials };
}
