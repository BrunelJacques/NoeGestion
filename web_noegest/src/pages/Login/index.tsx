// src/pages/Login.tsx

import { useState } from "react";
import  Xinput, { XinputPassword } from "../../ui/Xinput";
import  Xbutton from "../../ui/Xbutton";
import * as s from "./index.css.ts";
import { useLoginHandler } from "../../hooks/useLoginHandler.tsx";

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

