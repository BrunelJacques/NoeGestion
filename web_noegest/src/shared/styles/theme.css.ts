// theme.css.ts
import { createThemeContract, createTheme } from '@vanilla-extract/css';


export const vars = createThemeContract({
  colors: {
    background: null,
    backgroundLight: null,
    backgroundDark: null,
    secondary: null,
  },
});

export const lightTheme = createTheme(vars, {
  colors: {
    background: '#f9f9f9',
    backgroundLight: '#ffffff',
    backgroundDark: '#222222',
    secondary: '#5843E4',
  },
});

export const darkTheme = createTheme(vars, {
  colors: {
    background: '#222222',
    backgroundLight: '#ffffff',
    backgroundDark: '#000000',
    secondary: '#5843E4',
  },
});
