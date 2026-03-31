// src/pages/Login.tsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import  Xinput, { XinputPassword } from "../../ui/Xinput";
import  Xbutton from "../../ui/Xbutton";
import * as s from "./index.css.ts";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // URL d'origine ou fallback vers "/"
  const from = location.state?.from || "/";
  const to = from === '/logout' ? '/home': from ; // Évite de rediriger vers /logout après déconnexion
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await login(username, password);
    const success = result.success;
    console.log("Login success:", success,from, to);

    if (!success) {
      console.log("Login echec:", success);
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
      return;
    }

    if (success) {
      navigate(to, { replace: true });
    }
  }

  return (
  <>
    <h1>Login</h1> 

    <form onSubmit={handleSubmit} className={s.formStyle}>

      <Xinput
        value={username}
        onChange={setUsername}
        autoComplete="username"
        placeholder="Identifiant"
      />

      <XinputPassword
        value={password}
        onChange={setPassword}
        placeholder="Mot de passe"
        autoComplete="current-password"
      />

      <Xbutton type="submit" altClassName={s.btnStyle}>
        OK
      </Xbutton>
    </form>
  </>
  );
}

