// on applique la classe générée par Vanilla-Extract (lightTheme ou darkTheme) sur un conteneur racine
import { useState, useEffect } from "react";
import type { ReactNode } from "react"
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem("theme") as 'light' | 'dark') || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
