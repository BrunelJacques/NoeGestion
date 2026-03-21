// Xbutton.tsx
import React from "react";
import * as st from "./index.css";

type XbuttonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const Xbutton: React.FC<XbuttonProps> = ({
  label,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={st.fancyButton}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Xbutton;
