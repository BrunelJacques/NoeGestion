
import { createContext } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({ 
  theme: 'dark', // dark: false
  toggleTheme: () => {} }
);


export default ThemeContext;


