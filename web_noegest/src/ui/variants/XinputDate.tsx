// src/ui/variants/XinputDate.tsx
import { useRef, useState } from "react";
import { Xinput, XinputProps } from "../Xinput";
import { formatDateInput as formatValue, isValidDate } from "../formaters/date.ts";
import * as s from "../Xinput/index.css";
import { handleCursor } from "../formaters/handleCursor.ts";


export function XinputDate(props: XinputProps) {
  
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const valid = isValidDate(value);

  return (
    <div className={s.wrapperV}>
      
      <Xinput
        {...props}
        ref={inputRef} // sans ref, inputRef reste null
        value={value}
        maxLength={10}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
          handleCursor({ event: e, inputRef, formatValue, setValue })
        }}
        placeholder="jj/mm/aaaa"
        error={!valid ? "Date invalide" : null}
      />
    </div>
  );
}
