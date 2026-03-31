// src/ui/Xinput.tsx
import { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import * as s from "./index.css.ts";


// On utilise Omit pour remplacer le onChange standard par le tien (qui attend une string)
interface XinputProps extends Omit<ComponentPropsWithoutRef<
  "input">, 
  "onChange"> 
{
    onChange: (value: string) => void;
    altClassName?: string;
}

export default function Xinput ({
  type = "text",
  value,
  onChange,
  altClassName = "",
  ...props
}: XinputProps)  {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={s.inputStyle + " " + altClassName} 
      {...props}
    />
  );
};

export function XinputPassword(props: XinputProps) {

  const [isVisible, setIsVisible] = useState(false);
  function toggleVisibility() {
    setIsVisible(!isVisible);
  };

  return (
    <div  className={s.inputWrapperStyle}>
      <Xinput
        {...props}
        // On force le type en fonction de l'état local
        type={isVisible ? "text" : "password"}
        // On s'assure que le style laisse de la place pour l'icône à droite
        autoComplete={props.autoComplete || "current-password"}
      />
      
      <button
        className={s.toggleVisibilityStyle}
        type="button" // Important pour ne pas soumettre le formulaire par erreur
        onClick={toggleVisibility}
        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      >
        {isVisible ? "👁️" : "🙈"}
      </button>
    </div>
  );
}

