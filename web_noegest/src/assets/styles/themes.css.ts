// assets/styles/themes.css.ts
import { createThemeContract, createTheme } from '@vanilla-extract/css';
import { colors } from './colors.css';

export const vars = createThemeContract({
  color: {
    background: '',
    text: '',
    primary: '',
    secondary:'',
    surface: '',
    border: '',
  },
  space: {
    small: '',
    medium: '',
  },
});

// Thème clair
export const lightTheme = createTheme(vars, {
  color: {
    background: colors.bgEcran,
    text: colors.txtSombre,
    primary: colors.bgPrimary,
    secondary: colors.bgSecondary,
    surface: colors.bgTitre,
    border: colors.brdSombre,
  },
  space: {
    small: "4px",
    medium: "8px",
  },
});

// Thème sombre
export const darkTheme = createTheme(vars, {
  color: {
    background: colors.bgNoir,
    text: colors.txtBlanc,
    primary: colors.bgEcran,
    secondary: colors.bgSecondary,
    surface: colors.bgTitre,
    border: colors.brdClair,
  },
  space: {
    small: "4px",
    medium: "8px",
  },
});
