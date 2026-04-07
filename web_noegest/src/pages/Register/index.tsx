// src/pages/Register.tsx

import { useState } from "react";
import  Xinput, { XinputPassword } from "../../ui/Xinput/index.tsx";
import  Xbutton from "../../ui/Xbutton/index.tsx";
import { useLoginHandler } from "../../hooks/useLoginHandler.tsx";
import { Link } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loginWithCredentials} = useLoginHandler();


  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    loginWithCredentials(username, password);
    }
  return (
  <div className="container">
    <h3>Demande de création de compte</h3>
    <h5>Accès réservé au staff de l'association.</h5>

    <form onSubmit={handleSubmit} className="form">
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
      
      <Xbutton type="submit">
        Validation
      </Xbutton>
    </form>
  </div>
  );
}

