// src/ui/variants/XinputPhone.tsx
import { useRef, useState } from "react";
import {  Xinput, XinputProps } from "../Xinput";
import { handlePhoneChange } from "../formaters/phone";


export function XinputPhone(props: XinputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Xinput
      {...props}
      ref={inputRef} 
      type="tel"
      value={value}
      onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
        handlePhoneChange({ event: e, inputRef, setValue })
      }
      placeholder="06wwXinputPhone"
    />
  );
}

