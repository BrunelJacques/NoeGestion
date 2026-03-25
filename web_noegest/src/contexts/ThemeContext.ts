import { createContext } from "react";

export type Theme = "light" | "dark" ;

type ThemeContextType = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);


