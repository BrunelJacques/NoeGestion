// src/ui/variants/XinputDate.tsx
import { useState } from "react";
import { Xinput, XinputProps } from "../Xinput";
import { formatDateInput, isValidDate } from "../formaters/date.ts";
import * as s from "../Xinput/index.css";


export function XinputDate(props: XinputProps) {
  const [raw, setRaw] = useState("");
  const formatted = formatDateInput(raw);
  const valid = isValidDate(raw);

  return (
    <div className={s.wrapper}>
      
      <Xinput
        {...props}
        value={formatted}
        placeholder="jj/mm/aaaa"
        maxLength={10}
        onChange={(x) => setRaw(x.target.value)}
      />

      {!valid && <p className={s.errorStyle}>Date invalide</p>}
    </div>
  );
}
