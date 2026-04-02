// assets/styles/themes.css.ts
import { createThemeContract, createTheme } from '@vanilla-extract/css';
import { colors } from './colors.css';


export const vars = createThemeContract({
  color: {
    background: '',
    bgtitle: '',
    bgcard: '',
    text: '',
    altText: '',
    primary: '',
    secondary:'',
    border: '',
  },
});
//primaryGradient: `linear-gradient(135deg, ${rawColors.blue}, ${rawColors.pink})`
// Thème clair
export const lightTheme = createTheme(vars, {
  color: {
    background: colors.bgEcran,
    bgtitle: colors.bgTitre,
    bgcard: colors.bgSoutenu,
    text: colors.txtSombre,
    altText: colors.txtClair,
    primary: colors.bgPrimary,
    secondary: colors.bgSecondary,
    border: colors.brdSombre,
  },
});

// Thème sombre
export const darkTheme = createTheme(vars, {
  color: {
    background: colors.bgNoir,
    bgtitle: colors.bgTitre,
    bgcard: colors.bgTitre,
    text: colors.txtClair,
    altText: colors.txtSombre,
    primary: colors.bgSecondary,
    secondary: colors.bgSoutenu,
    border: colors.brdClair,
  },
});
