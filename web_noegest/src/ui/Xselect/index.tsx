// src/ui/Xselect.tsx
import type { ComponentPropsWithoutRef, RefObject } from "react";
import * as s from "./index.css.ts";

function noAction() {}

// Type pour une option individuelle
export interface XselectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface XselectProps extends Omit<
  ComponentPropsWithoutRef<"select">,
  "onChange"
> {
  options: XselectOption[]; //tableau d'options à afficher
  onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  ref?: RefObject<HTMLSelectElement | null>;
  altClassName?: string;
  label?: string;
  error?: string | null;
  placeholder?: string; // Utilisé comme première option muette
}

export function Xselect({
  options,
  onChange = noAction,
  altClassName = "",
  label,
  error = null,
  disabled = false,
  placeholder,
  ...props
}: XselectProps) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;
    onChange?.(e);
  };

  return (
    <div className={s.wrapperV}>
      <div className={s.wrapperH}>
        {label && <span className={s.label}>{label} :</span>}
        
        <select
          {...props}
          disabled={disabled}
          onChange={handleChange}
          className={[
            s.baseInput, 
            disabled && s.disabledInput,
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
        <p className={s.errorStyle}>{error}</p>
      )}
    </div>
  );
}