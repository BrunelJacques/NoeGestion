// theme.css.ts
import { createThemeContract, createTheme } from '@vanilla-extract/css';


export const vars = createThemeContract({
  colors: {
    background: null,
    backgroundLight: null,
    backgroundDark: null,
    primary: null,
    secondary: null,
  },
});

export const lightTheme = createTheme(vars, {
  colors: {
    background: '#f9f9f9',
    backgroundLight: '#ffffff',
    backgroundDark: '#222222',
    primary: '#3f729b',
    secondary: '#5843E4',
  },
});

export const darkTheme = createTheme(vars, {
  colors: {
    background: '#222222',
    backgroundLight: '#ffffff',
    backgroundDark: '#000000',
    primary: '#6ba4d9',
    secondary: '#5843E4',
  },
});
