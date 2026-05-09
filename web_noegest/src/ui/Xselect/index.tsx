// src/ui/Xselect.tsx
import type { ComponentPropsWithoutRef } from "react";
import * as sc from "../xcommon.css.ts";


// Type pour une option individuelle
export interface XselectOption<T extends string | number> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface XselectProps<T extends string | number>
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
  value,
  options,
  onChange,
  altClassName = "",
  label,
  error = null,
  disabled = false,
  placeholder,
  ...props
}: XselectProps<T>
) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;

    const raw = e.target.value;

    // Convertit automatiquement en number si l’option est un number
    const typedValue = (typeof value === "number"
      ? Number(raw)
      : raw) as T;

    onChange?.(typedValue);
  };

  return (
    <div className={sc.wrapperV}>
      <div className={sc.wrapperH}>
        {label && <span className={sc.label}>{label} :</span>}
        
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
          {placeholder && (
            <option value="" disabled hidden={!props.required}>
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
}