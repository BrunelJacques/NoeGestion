// Exemple composant utilisant le localStorage pour stocker sur le disque le thème sélectionné par l'utilisateur.
// seesionStorage est similaire mais les données sont supprimées lorsque la session du navigateur se termine.

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

interface LocalStorageProps {
  defaultTheme?: Theme;
}

export const LocalStorage: React.FC<LocalStorageProps> = ({ defaultTheme = "light" }) => {
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

export default LocalStorage;