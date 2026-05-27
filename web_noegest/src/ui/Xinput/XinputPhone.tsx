// src/ui/variants/XinputPhone.tsx
import { useRef, useState } from "react";
import {  Xinput } from ".";
import type { Props } from ".";
import { formatPhoneNumber as formatValue } from "../../utils/phone";
import { handleCursor } from "../../utils/handleCursor";

export function XinputPhone(props: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Xinput
      {...props}
      type="tel"
      value={value}
      onChange={(e) => {
        inputRef.current = e.currentTarget;
        handleCursor({ event: e, inputRef, formatValue, setValue });
      }}
      placeholder="06wwXinputPhone"
    />
  );
}

