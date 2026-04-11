// src/ui/Xinput.tsx
import { ComponentPropsWithoutRef, RefObject } from "react";
import * as s from "./index.css.ts";


export interface XinputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange"
> {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLInputElement | null>;
  altClassName?: string;
  label?: string;
  error?: string | null;
}


export function Xinput({
  type = "text",
  onChange,
  altClassName = "",
  label,
  error = null,
  disabled = false,
  ...props
}: XinputProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    onChange?.(e);
  };

  return (
    <div className={s.wrapperV}>
      <div className={s.wrapperH}>
        {label && <span className={s.label}>{label} :</span>}
        <input
          type={type}
          value={props.value}
          disabled={disabled}
          onChange={handleChange}
          className={[
            s.baseInput,
            disabled && s.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
          placeholder={props.placeholder ?? " "} // force un placeholder non vide
          {...props}
        />
      </div>
      {error && (
        <p className={s.errorStyle}>{error}</p>
      )}
    </div>
  );
}
