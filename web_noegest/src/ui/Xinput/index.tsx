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
  onChange = () => {},
  altClassName = "",
  label = "label input",
  disabled = false,
  ...props
}: XinputProps)  {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // ⛔ bloque tout
    onChange?.(e.target.value);
  };

  return (
    <div className={s.wrapper}>
      {label && <span className={s.label}>{label} :</span>}
      <input
        type={type}
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


function formatDateInput(raw: string): string {
  // Supprime tout sauf les chiffres
  const digits = raw.replace(/\D/g, "").slice(0, 8);

  const parts = [];
  if (digits.length >= 2) parts.push(digits.slice(0, 2));       // jj
  if (digits.length >= 4) parts.push(digits.slice(2, 4));       // mm
  if (digits.length > 4)  parts.push(digits.slice(4, 8));       // aaaa

  console.log("formatDate:", raw, parts.join("/"))
  //return parts.join("/");
  return raw
}


export function XinputDate(props: XinputProps) {
  //const [date, setDate] = useState("");
  const [raw, setRaw] = useState("");
  
  return (
    <div  className={s.wrapper}>
      <Xinput
        {...props}
        value={formatDateInput(raw)}
        onChange={(x) => {
          setRaw(x);
        }} 
        placeholder={props?.placeholder || "jj/mm/aaaa"}
      />
    </div>
  );
}


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
