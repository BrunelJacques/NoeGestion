// src/ui/Xinput.tsx
import type { ComponentPropsWithoutRef } from "react";
import * as sc from "../xcommon.css.ts";


export interface XinputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange"
> {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  //ref?: RefObject<HTMLInputElement | null>;
  altClassName?: string;
  label?: string;
  error?: string | null;
}


export function Xinput({
  //type = "text",
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
    <div className={sc.wrapperV}>
      <div className={sc.wrapperH}>
        {label && <span className={sc.label}> {label} :</span>}

        <input
          type={props.type}
          value={props.value}
          disabled={disabled}
          onChange={handleChange}
          className={[
            sc.baseInput,
            disabled && sc.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
          placeholder={props.placeholder ?? " "} // force un placeholder non vide
          {...props}
        />
      </div>

      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
}
