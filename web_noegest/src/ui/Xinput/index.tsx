import  { useState } from "react";

type XinputProps = {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function Xinput ({
  type = "text",
  value,
  onChange,
  placeholder
}: XinputProps)  {
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

export function XinputPassword({ value, onChange, placeholder }: XinputProps) {
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
