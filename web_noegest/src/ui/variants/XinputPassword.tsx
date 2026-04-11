
import  { Xinput, XinputProps } from "../Xinput";
import { useState } from "react";
import * as s from "../Xinput/index.css"

export function XinputPassword(props: XinputProps) {
  const [isVisible, setIsVisible] = useState(false);
  function toggleVisibility() {
    setIsVisible(!isVisible);
  };
  return (
    <div  className={s.wrapperV}>
      <Xinput
        // Transmet les props en paquet
        {...props}
        // Force le props.type en fonction de l'état local
        type={isVisible ? "text" : "password"}
        autoComplete={props.autoComplete || "current-password"}
      />
       <button
        className={s.toggleVisibilityStyle}
        type="button" // Important pour ne pas soumettre le formulaire par erreur
        onClick={toggleVisibility}
        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      >
        {isVisible ? "🙈": "voir👁️"}
      </button>
    </div>
  );
}
