// FancyButton.tsx
import React from "react";
import "./FancyButton.css";

type FancyButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const FancyButton: React.FC<FancyButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className="fancy-button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
