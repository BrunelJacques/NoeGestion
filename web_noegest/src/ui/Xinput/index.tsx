// src/ui/Xinput.tsx
import { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import * as s from "./index.css.ts";


// On utilise Omit pour remplacer le onChange standard par le tien (qui attend une string)
interface XinputProps extends Omit<
  ComponentPropsWithoutRef<"input">, 
  "onChange"
>{
    onChange: (value: string) => void;
    altClassName?: string;
    label?: string;
}


export default function Xinput ({
  type = "text",
  value,
  onChange,
  altClassName = "",
  label = "label input",
  ...props
}: XinputProps)  {
  return (
    <div className={s.wrapper}>
      {label && <span className={s.label}>{label} :</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={s.baseInput + " " + altClassName} 
        {...props}
        /> 
    </div>
  );
};


export function XinputPassword(props: XinputProps) {
  const [isVisible, setIsVisible] = useState(false);
  function toggleVisibility() {
    setIsVisible(!isVisible);
  };
  return (
    <div  className={s.wrapperPassword}>
      <div className={s.wrapper}>
        <Xinput
          // Transmet les props en paquet
          {...props}
          // Force le props.type en fonction de l'état local
          type={isVisible ? "text" : "password"}
          // Assure que le style laisse de la place pour l'icône à droite
          autoComplete={props.autoComplete || "current-password"}
        />
      </div>

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

