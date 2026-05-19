
import  { Xinput } from "../Xinput";
import type { Props } from "../Xinput"; 
import { useState } from "react";
import * as sc from "../xcommon.css"

export function XinputPassword(props: Props) {
  const [isVisible, setIsVisible] = useState(false);
  function toggleVisibility() {
    setIsVisible(!isVisible);
  };
  return (
    <div  className={sc.wrapperV}>
      <Xinput
        // Transmet les props en paquet
        {...props}
        // Force le props.type en fonction de l'état local
        type={isVisible ? "text" : "password"}
        autoComplete={props.autoComplete || "current-password"}
      />
       <button
        className={sc.toggleVoir}
        type="button" // Important pour ne pas soumettre le formulaire par erreur
        onClick={toggleVisibility}
        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      >
        {isVisible ? "🙈": "voir👁️"}
      </button>
    </div>
  );
}
