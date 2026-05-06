// assets/styles/themes.css.ts
import { createThemeContract, createTheme } from '@vanilla-extract/css';
import { colors } from './colors.css';


export const vars = createThemeContract({
  color: {
    body: '',
    cardTitle: '',
    card: '',
    text: '',
    textLower: '',
    primary: '',
    secondary:'',
    textPrimary: '',
    border: '',
  },
});
//primaryGradient: `linear-gradient(135deg, ${rawColors.blue}, ${rawColors.pink})`
// Thème clair
export const lightTheme = createTheme(vars, {
  color: {
    body: colors.bglight_body,
    cardTitle: colors.bglight_title,
    card: colors.bglight_card,
    text: colors.txt_dark,
    textLower: colors.txt_lessdark,
    primary: colors.bglight_primary,
    secondary: colors.bglight_secondary,
    textPrimary: colors.txt_light,
    border: colors.brd_dark,
  },
});

// Thème sombre
export const darkTheme = createTheme(vars, {
  color: {
    body: colors.bgdark_body,
    cardTitle: colors.bgdark_title,
    card: colors.bgdark_card,
    text: colors.txt_light,
    textLower: colors.txt_lesslight,
    primary: colors.bgdark_primary,
    secondary: colors.bgdark_secondary,
    textPrimary: colors.txt_light,
    border: colors.brd_light,
  },
});
