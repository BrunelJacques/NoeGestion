
// non utilisé

import { useState, useEffect } from "react";

import type { Theme } from "./ThemeContext";

interface LocalStorageProps {
  defaultTheme?: Theme;
}


// seesionStorage est similaire mais les données sont supprimées lorsque la session du navigateur se termine.
export default function ZZZLocalStorage({ defaultTheme = "light" }: LocalStorageProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
    </div>
  );
};

