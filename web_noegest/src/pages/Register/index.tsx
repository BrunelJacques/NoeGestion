// src/pages/Register.tsx

import { useState } from "react";
import { Xinput } from "../../ui/Xinput/index.tsx";
import  { Xbutton } from "../../ui/Xbutton/index.tsx";
import * as s from "./index.css.ts"
import { useAuth } from "../../hooks/useAuth.tsx";
import { XinputDate } from "../../ui/variants/XinputDate.tsx";
import { XinputPhone } from "../../ui/variants/XinputPhone.tsx";


export default function Register() {
  const { user } = useAuth();
  const [username] = useState(user?.username);
  const isLogged = user !== null

  function noAction(){}

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // todo
    console.log("call register todo! username:",username)
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
        value={user?.email}
        //onChange={noAction}
        label="Mail identifiant"
        placeholder="adresse mail"
        autoComplete="email"
        disabled={isLogged}
      />

      <Xinput
        value={user?.lastName}
        onChange={noAction}
        label="Nom"
        placeholder="votre nom"
        autoComplete="family-name"
        disabled={isLogged}
      />

      <Xinput
        value={user?.firstName}
        onChange={noAction}
        label="Prénom"
        placeholder="votre prénom"
        autoComplete="given-name"
        disabled={isLogged}
      />

      <XinputDate
        value={user?.bday}
        onChange={noAction}
        label="Date de naissance"
        autoComplete="bday"
        disabled={isLogged}
      />

      <XinputPhone
        value={user?user.phone:""}
        onChange={noAction}
        label="Téléphone"
        placeholder="06xxxxxxxx"
        autoComplete="mobile"
      />

      <Xinput
        value=""
        onChange={noAction}
        label="Nvx mot de passe"
        placeholder="8car+Maj+Min+Chiffre"
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

