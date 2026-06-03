// src/ui/variants/XinputDate.tsx
import { Xinput } from "./index.tsx";
import  * as dt from "../../utils/dates.ts";
import * as sc from "../xcommon.css.ts";
import { handleCursor } from "../../utils/handleCursor.ts";
import { useRef, useState } from "react";



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

  const [dateTxt, setValue] = useState(dt.dateToStringFr(jour));

  const valid = dateTxt === "" || dt.isValidDateFr(dateTxt);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;

    function formatValue(txt:string) {
      return dt.stringToFormatted(txt)
    }

    // Met à jour le texte dans l'input
    handleCursor({ event: e, inputRef,formatValue, setValue })
    console.log("handleChange saisie:",e.currentTarget)

    const currentTxt = e.target.value;
    const isValid = dt.isValidDateFr(currentTxt)
    console.log("handleChange value:",dateTxt, "isValid:", isValid)

    if (isValid && onChange) {
      onChange(dt.stringToDate(currentTxt)) // todo newJour
    } else if (currentTxt === "" && onChange) {
      onChange(null);
    }
  };

  return (
    <div className={sc.wrapperV}>
      
      <Xinput
        {...props}
        value={dateTxt}
        maxLength={10}
        onChange={handleChange}
        placeholder="jjmmaaaa"
        error={!valid ? "Date invalide" : null}
      />
    </div>
  );
}
