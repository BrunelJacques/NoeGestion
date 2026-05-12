// src/ui/Xselect.tsx
import type { ComponentPropsWithoutRef } from "react";
import * as sc from "../xcommon.css.ts";


// Type pour une option individuelle
export interface XselectOption<T extends string | number> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface Props<T extends string | number>
  extends Omit<ComponentPropsWithoutRef<"select">,"onChange"
> {
  value: T;
  options: XselectOption<T>[]; //tableau d'options à afficher
  onChange?: (value:T) => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  placeholder?: string; // Utilisé comme première option muette
}

export function Xselect<T extends string | number>({
  altClassName = "",
  disabled = false,
  ...props
}: Props<T>
) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;

    const raw = e.target.value;
    
    // Convertit automatiquement en number si l’option est un number
    const typedValue = (typeof props.value === "number"
      ? Number(raw)
      : raw) as T;

    props.onChange?.(typedValue);
  };

  return (
    <div className={sc.wrapperV}>
      <div className={sc.wrapperH}>
        {props.label && <span className={sc.label}>{props.label} :</span>}
        
        <select
          {...props}
          disabled={disabled}
          onChange={handleChange}
          className={[
            sc.baseInput, 
            disabled && sc.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
        >
          {/* Gestion du placeholder comme option par défaut */}
          {props.placeholder && (
            <option value="" disabled hidden={!props.required}>
              {props.placeholder}
            </option>
          )}

          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      
      {props.error && (
        <p className={sc.errorStyle}>{props.error}</p>
      )}
    </div>
  );
}