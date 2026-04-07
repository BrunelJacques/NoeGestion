// src/pages/Login.tsx

import { useState } from "react";
import  Xinput, { XinputPassword } from "../../ui/Xinput";
import  Xbutton from "../../ui/Xbutton";
import * as s from "./index.css.ts";
import { useLoginHandler } from "../../hooks/useLoginHandler.tsx";
import { Link } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loginWithCredentials} = useLoginHandler();

  // URL d'origine ou fallback vers "/"
  //const from = location.state?.from || "/";
  //const to = from === '/logout' ? '/home': from ; // Évite de rediriger vers /logout après déconnexion

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    loginWithCredentials(username, password);
    }


  return (
  <div className="container">
    <h3>Intranet Matthania</h3>
    <h5>Accès réservé au staff de l'association.</h5>
    <h5>membre sans compte?
      <Link to="/register" className={s.linkStyle}>          
          créer un compte
      </Link>
    </h5>

    <form onSubmit={handleSubmit} className="form">
      <Xinput
        value={username}
        onChange={setUsername}
        label="libellé"
        autoComplete="username"
        placeholder="Identifiant"
      />

      <XinputPassword
        value={password}
        onChange={setPassword}
        placeholder="Mot de passe"
        autoComplete="current-password"
      />
      
      <Xbutton type="submit">
        Validation
      </Xbutton>
    </form>
  </div>
  );
}

