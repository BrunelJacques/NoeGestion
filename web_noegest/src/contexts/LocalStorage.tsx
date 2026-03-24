// Exemple composant utilisant le localStorage pour stocker sur le disque le thème sélectionné par l'utilisateur.
// seesionStorage est similaire mais les données sont supprimées lorsque la session du navigateur se termine.

// non utilisé

import { useState, useEffect } from "react";

import type { Theme } from "./ThemeContext";

interface LocalStorageProps {
  defaultTheme?: Theme;
}

export default function LocalStorage({ defaultTheme = "light" }: LocalStorageProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <p>Thème actuel : {theme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
    </div>
  );
};

