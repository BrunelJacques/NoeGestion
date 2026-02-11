import React, { useState } from "react";
import "./FancyInput.css";

type FancyInputProps = {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const FancyInput: React.FC<FancyInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder
}) => {
  return (
    <input
      type={type}
      className="fancy-input"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export const FancyInputPassword: React.FC<FancyInputProps> = ({
  value,
  onChange,
  placeholder
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="fancy-input-wrapper">
      <input
        type={visible ? "text" : "password"}
        className="fancy-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />

      <button
        type="button"
        className="toggle-visibility"
        onClick={() => setVisible(v => !v)}
      >
        {visible ? "🙈" : "👁️"}
      </button>
    </div>
  );
};
