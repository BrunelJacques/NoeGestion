// src/ui/variants/XinputDate.tsx
import { Xinput } from "./index.tsx";
import  * as dt from "../../utils/dates.ts";
import * as sc from "../xcommon.css.ts";
import { useLayoutEffect, useRef, useState } from "react";


interface Props  {
  jour: Date|null;
  onChange?: (value: Date|null) => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  showReset?:boolean;
  disabled?:boolean
}


export function XinputDate({
  jour,
  onChange,
  ...props
}: Props) {

  const inputRef = useRef<HTMLInputElement>(null);

  const cursorPosRef = useRef<number | null>(null);

  const [dateFr, setDateFr] = useState(dt.dateToStringFr(jour));

  const valid = dateFr === "" || dt.isValidDateFr(dateFr);


  const handleBackSpace = () => {  // Sauter le slash automatiquement sinon il sera remis par le formatage
    const pos = cursorPosRef.current ?? 0;
    const carAtPos = dateFr.charAt(pos);
    console.log("Backspace détecté, actuelle:", dateFr,pos,"/",carAtPos,"/")
    if (carAtPos === "/") {
      setDateFr(dateFr.slice(0,carAtPos === "/" ? pos - 1 : pos) + dateFr.slice(pos));
      console.log("Backspace setDateFr:", dateFr)
    }
    ;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;

    const el = e.target;

    // 1. Sauvegarde de la position du curseur
    cursorPosRef.current = el.selectionStart ?? null;

    // 2. Formatage
    const formatted = dt.stringToFormatted(el.value);


    // 3. Mise à jour du state pour input.value
    setDateFr(formatted);

    // 4. Validation + callback parent
    const isValid = dt.isValidDateFr(formatted);
    if (isValid && onChange) {
      onChange(dt.stringToDate(formatted));
    } else if (formatted === "" && onChange) {
      onChange(null);
    }
  };

  // 5. Restauration du curseur après rerender
  useLayoutEffect(() => {
    const el = inputRef.current;
    let pos = cursorPosRef.current;
    console.log("Restauration du curseur à la position:", cursorPosRef.current);
    if ( !el || !pos) return;
   

    // Ajustement si curseur derrière un "/" ajouté automatiquement
    if (dateFr[pos - 1] === "/"  && [2, 5].includes(pos) ) {
      pos -= 1;
    }
    el.setSelectionRange(pos, pos);
    console.log("Curseur restauré à la position:", pos);
  }, [dateFr]);

  return (
    <div className={sc.wrapperV}>
      <Xinput
        {...props}
        ref={inputRef}
        value={dateFr}
        maxLength={10}
        onChange={handleChange}
        onBackSpace={handleBackSpace}
        placeholder="jjmmaaaa"
        error={!valid ? "Date invalide" : null}
      />
    </div>
  );
}
