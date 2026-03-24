// première version du theme, toggle deux thèmes seulement

import { useState, ReactNode } from 'react';

import { ThemeContext, Theme } from '../contexts/ThemeContext.ts';


export default function ThemeProvider ({ children }: { children: ReactNode }) {
  const [theme,sTheme] = useState<Theme>('light');

  const setTheme = () => {
    sTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

