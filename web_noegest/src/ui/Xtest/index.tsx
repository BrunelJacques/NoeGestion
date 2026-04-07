import { ComponentPropsWithoutRef } from "react";
import * as s from "./index.css.ts";

interface XinputProps extends Omit<ComponentPropsWithoutRef<"input">, "onChange"> {
  onChange: (value: string) => void;
  altClassName?: string;
  label?: string;
}

export default function Xtest({
  type = "text",
  value,
  onChange,
  altClassName = "",
  label,
  ...props
}: XinputProps) {
  return (
    <div className={s.wrapper}>
      {label && <span className={s.label}>{label}</span>}

      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={s.inputStyle + " " + altClassName}
        {...props}
      />
    </div>
  );
}
