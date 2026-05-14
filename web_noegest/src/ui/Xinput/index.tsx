// src/ui/Xinput.tsx
import type { ComponentPropsWithoutRef } from "react";
import croix from "../../assets/icons/croix.png"
import * as sc from "../xcommon.css.ts";


export interface XinputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange"
> {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  showReset?:boolean;
}


export function Xinput({
  onChange,
  altClassName = "",
  label,
  error = null,
  showReset = true,
  ...props
}: XinputProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    onChange?.(e);
  };

  const handleReset = () => {
    if (props.disabled) return;
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  return (
    <div className={sc.wrapperV}>
      <div className={sc.wrapperH}>
        {label && <span className={sc.label}> {label} :</span>}

        <input
          value={props.value}
          onChange={handleChange}
          className={[
            sc.baseInput,
            props.disabled && sc.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
          //placeholder={props.placeholder ?? " "} // force un placeholder non vide
          {...props}
        />
        {showReset && props.value && (
          <button
            type="button"
            className={sc.resetButton}
            onClick={handleReset}
          >
            <img title={"croix"} src={croix} />
          </button>
          )}
      </div>

      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
}
