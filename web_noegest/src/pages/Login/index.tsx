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
  const { loginWithCredentials } = useLoginHandler();

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    loginWithCredentials(username, password);
  }
  return (
    <div className="container">
      <h3>Intranet Matthania</h3>
      <h5>Accès réservé au staff de l'association.</h5>
      <h5>
        membre sans compte?
        <Link to="/register" className={s.linkStyle}>
          créer un compte
        </Link>
      </h5>

      <hr className='discret' />

      <form onSubmit={handleSubmit} className="form">
        <Xinput
          value={username}
          onChange={setUsername}
          label="Mail identifiant"
          autoComplete="username"
          placeholder="Adresse mail ou ID"
        />

        <XinputPassword
          value={password}
          onChange={setPassword}
          label="Mot de passe"
          placeholder="Mot de passe"
          autoComplete="current-password"
        />

        <Xbutton type="submit">Validation</Xbutton>
      </form>

      <hr />

      {/* Rendu conditionnel : on vérifie si username n'est pas vide */}
      {username.trim() !== "" && (
        <h5>

          Changer mot de passe?
          <Link to="/register" className={s.linkStyle}>
            renvoi mot_passe
          </Link>
        </h5>
      )}
    </div>
  );
}