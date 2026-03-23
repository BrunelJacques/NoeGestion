// Xbutton.tsx
import * as st from "./index.css";

type XbuttonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Xbutton({ label, onClick, disabled = false, type = "button" }: XbuttonProps) {
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

