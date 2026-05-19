// src/ui/variants/XinputPhone.tsx
import { useRef, useState } from "react";
import {  Xinput } from "../Xinput";
import type { Props } from "../Xinput";
import { formatPhoneNumber as formatValue } from "../../utils/phone";
import { handleCursor } from "../../utils/handleCursor";

export function XinputPhone(props: Props) {
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

