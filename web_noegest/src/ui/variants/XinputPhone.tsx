// src/ui/variants/XinputPhone.tsx
import { useRef, useState } from "react";
import {  Xinput, XinputProps } from "../Xinput";
import { formatPhoneNumber as formatValue } from "../formaters/phone";
import { handleCursor } from "../formaters/handleCursor";

export function XinputPhone(props: XinputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Xinput
      {...props}
      ref={inputRef}  // sans ref, inputRef reste null
      type="tel"
      value={value}
      onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
        handleCursor({ event: e, inputRef, formatValue, setValue })
      }
      placeholder="06wwXinputPhone"
    />
  );
}

