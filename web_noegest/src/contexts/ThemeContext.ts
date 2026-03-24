import { createContext } from "react";

export type Theme = "light" | "dark" | "purple";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);


