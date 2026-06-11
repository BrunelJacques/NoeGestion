// src/ui/Xinput.index.tsx
import { forwardRef, useRef, type ComponentPropsWithoutRef } from "react";
import croix from "../../assets/icons/croix.png"
import * as sc from "../xcommon.css.ts";


export interface Props extends Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange"
> {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBackSpace?: () => void;
  onReset?: () => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  showReset?: boolean;
}


export const Xinput = forwardRef<HTMLInputElement, Props>(({
    onChange,
    onBackSpace,
    onReset,
    altClassName = "",
    label,
    error = null,
    showReset = true,
    ...props
 }, ref) => {

  const inputRef = useRef<HTMLInputElement>(null); // retour focus après reset

  const isBackspacePressed = useRef(false); // La dernière touche pressée était Backspace

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Si la touche est Backspace ou Delete, on l'enregistre
    isBackspacePressed.current = !!["Backspace", "Delete"].find(k => k === e.key);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    onChange?.(e);
    
    if (isBackspacePressed.current) { // déclenche l'action dédiée Backspace 
      onBackSpace?.();
      isBackspacePressed.current = false; // Reset après exécution
    }
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
          ref={ref}
          value={props.value}
          onChange={handleChange}
          onBlur={handleChange}
          onKeyDown={handleKeyDown} // handler pour backspace
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
            <img className={sc.small10} title={"croix"} src={croix} alt="reset" />
          </button>
        )}
      </div>

      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
});