// src/ui/Xinput.tsx
import { useRef, type ComponentPropsWithoutRef } from "react";
import croix from "../../assets/icons/croix.png"
import * as sc from "../xcommon.css.ts";


export interface Props extends Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange"
> {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  showReset?:boolean;
}


export function Xinput({
  onChange,
  onReset,
  altClassName = "",
  label,
  error = null,
  showReset = true,
  ...props
}: Props) {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    onChange?.(e);
  };

  const handleReset = () => {
    if (props.disabled) return;

    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event); // renvoie l'event au parent props.onChange
    onReset?.(); // action optionnelle déclenchée chez le parent 

    if (inputRef && typeof inputRef !== "function") {
      inputRef.current?.focus(); // remet le focus sur l'input après reset
    }
    
  };

  return (
    <div className={sc.wrapperV}>
      <div className={sc.wrapperH}>
        {label && <span className={sc.label}> {label} :</span>}

        <input
          ref={inputRef}
          value={props.value}
          onChange={handleChange}
          onBlur={handleChange}
          className={[
            sc.baseInput,
            props.disabled && sc.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
          {...props}
        />
        {showReset && props.value && (
          <button
            type="button"
            className={sc.resetButton}
            onClick={handleReset} 
          >
            <img className={sc.small10} title={"croix"} src={croix} />
          </button>
          )}
      </div>

      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
}
