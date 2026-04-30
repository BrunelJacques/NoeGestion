// src/pages/Login.tsx

import { useState } from "react";
import { Xinput }  from "../../ui/Xinput";
import { Xbutton } from "../../ui/Xbutton";
import * as s from "./index.css.ts";
import { useLoginHandler } from "../../hooks/useLoginHandler.tsx";
import { Link } from "react-router";
import { XinputPassword } from "../../ui/variants/XinputPassword.tsx";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithCredentials } = useLoginHandler();


  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginWithCredentials(username, password);
  }

  return (
    <div className="pageContainer">
      <div className="subContainer">
        <h2>Intranet Matthania</h2>
        <h3>Accès réservé au staff de l'association.</h3>
      
        <hr className='discret' />

        <form onSubmit={handleSubmit} className="form">
          <Xinput
            value={username}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value)
            }}
            label="Mail identifiant"
            autoComplete="username"
            placeholder="Adresse mail ou ID"
          />

          <XinputPassword
            value={password}
            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
            }}
            label="Mot de passe"
            placeholder="Mot de passe"
            autoComplete="current-password"
          />

          <Xbutton type="submit">Validation</Xbutton>
        </form>
      </div>
      <hr />

      <div className={s.containlink}>
        {/* Rendu conditionnel : on vérifie si username n'est pas vide */}
        {username.trim() !== "" && (
          <h5 className={s.inlineBlock}>
            Changer mot de passe?
            <Link to="/register" className={s.linkStyle}>
              renvoi mot_passe
            </Link>
          </h5>
        )}
        <h5 className={s.inlineBlock}>
          Membre sans compte?
          <Link to="/register" className={s.linkStyle}>
            créer un compte
          </Link>
        </h5>
      </div>

    </div>
  );
}