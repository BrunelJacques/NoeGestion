// src/pages/Register.tsx

import { useState } from "react";
import  Xinput from "../../ui/Xinput/index.tsx";
import  Xbutton from "../../ui/Xbutton/index.tsx";
import { useLoginHandler } from "../../hooks/useLoginHandler.tsx";
import * as s from "./index.css.ts"

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loginWithCredentials} = useLoginHandler();


  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    loginWithCredentials(username, password);
    }
  return (
  <>
  <div className="container">
    <h3>Demande de création de compte</h3>
    <h4>Accès réservé au staff de l'association.</h4>
    <p>Vos données doivent correspondre à celles déjà détenues par Matthania.</p>
  </div>

  <div className={s.localCard}>
    <form onSubmit={handleSubmit} className={s.cardGrid}>
      <Xinput
        value={username}
        onChange={setUsername}
        label="Mail identifiant"
        placeholder="adresse mail"
        autoComplete="email"
      />

      <Xinput
        value={password}
        onChange={setPassword}
        label="Nom"
        placeholder="votre nom"
        autoComplete="family-name"
      />

      <Xinput
        value={username}
        onChange={setUsername}
        label="Prénom"
        placeholder="votre prénom"
        autoComplete="given-name"
      />

      <Xinput
        value={password}
        onChange={setPassword}
        label="Date de naissance"
        placeholder="jj/mm/aaaa"
        autoComplete="off"
      />

      <Xinput
        value={username}
        onChange={setUsername}
        label="Téléphone"
        placeholder="06xxxxxxxx"
        autoComplete="tel"
      />

      <Xinput
        value={password}
        onChange={setPassword}
        label="Nvx mot de passe"
        placeholder="8car Maj Min Chifre"
        autoComplete="off"
      />
      
      <div></div>{/*  pour nb pair de composant */} 
      <Xbutton type="submit">
        Validation
      </Xbutton>
    </form>
  </div>
  </>
  );
}

