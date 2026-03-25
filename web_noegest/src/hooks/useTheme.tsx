import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

/* 
import { useEffect, useState } from "react";
import { Theme } from "../contexts/ThemeContext"

const STORAGE_KEY = "app-theme";

export function useTheme() {
  const getPreferredTheme = (): Theme => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

    if (stored) return stored;

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemDark ? "dark" : "light";
  };

  const [theme, setThemeState] = useState<Theme>(getPreferredTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}; */