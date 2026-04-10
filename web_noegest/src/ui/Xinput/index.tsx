// src/ui/Xinput.tsx
import { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import * as s from "./index.css.ts";


// On utilise Omit pour remplacer le onChange standard par le tien (qui attend une string)
interface XinputProps extends Omit<
  ComponentPropsWithoutRef<"input">, 
  "onChange"
>{
    onChange?: (value: string) => void;
    altClassName?: string;
    label?: string;
}

export default function Xinput ({
  type = "text",
  value,
  onChange,
  altClassName = "",
  label = "label input",
  disabled = false,
  ...props
}: XinputProps)  {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // ⛔ bloque tout
    onChange?.(e.target.value);
  };

  const typeInput = (type == "password")? "password": "text"

  return (
    <div className={s.wrapper}>
      {label && <span className={s.label}>{label} :</span>}
      <input
        type={typeInput}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className={[
          s.baseInput,
          disabled && s.disabledInput,
          altClassName
        ].filter(Boolean).join(" ")}
        {...props}
      />
    </div>
  );
}



export function XinputDate(props: XinputProps) {
  const [date, setDate] = useState('');
  const [isValid, setIsValid] = useState(true);

  function formatDate (val: string) {
    let value = val.replace(/\D/g, ''); // On retire tout ce qui n'est pas un chiffre
    
    if (value.length > 8) value = value.slice(0, 8); // On limite à 8 chiffres (jjmmaaaa)

    // Formatage dynamique : jj/mm/aaaa
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = value.substring(0, 2);
      if (value.length > 2) {
        formattedValue += '/' + value.substring(2, 4);
      }
      if (value.length > 4) {
        formattedValue += '/' + value.substring(4, 8);
      }
    }

    setDate(formattedValue);

    // Validation basique si la date est complète
    if (value.length === 8) {
      const day = parseInt(value.substring(0, 2));
      const month = parseInt(value.substring(2, 4));
      const year = parseInt(value.substring(4, 8));
      
      // Vérification simple de la validité (mois entre 1-12, jours 1-31)
      const dateObj = new Date(year, month - 1, day);
      const isDateValid = 
        dateObj.getFullYear() === year && 
        dateObj.getMonth() === month - 1 && 
        dateObj.getDate() === day;
      
      setIsValid(isDateValid);
    } else {
      setIsValid(true); // On ne montre pas d'erreur tant que la saisie est en cours
    }
  };

  return (
    <div className= {s.wrapper}>
      {props.label && <span className={s.label}>{props.label} :</span>}
      <Xinput
        {...props}
        value={date}
        placeholder="jj/mm/aaaa"
        onChange={formatDate} 
        maxLength={10} // "10/10/2024" = 10 caractères
      />
      {!isValid && <p className={s.errorStyle}>Date invalide</p>}
    </div>
  );
};


export function XinputPassword(props: XinputProps) {
  const [isVisible, setIsVisible] = useState(false);
  function toggleVisibility() {
    setIsVisible(!isVisible);
  };
  return (
    <div  className={s.wrapper}>
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
