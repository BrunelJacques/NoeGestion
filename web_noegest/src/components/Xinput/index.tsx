import React, { useState } from "react";

type XinputProps = {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Xinput: React.FC<XinputProps> = ({
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

export const XinputPassword: React.FC<XinputProps> = ({
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

export default Xinput;