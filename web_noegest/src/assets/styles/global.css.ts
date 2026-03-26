// assets/styles/global.css.ts
import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';
import { colors } from './colors.css';

export const varsGlobal = createGlobalTheme(':root', {
  colors,
  layout: {
    maxWidthField: "210px",
  },
  misc: {
    mdcFilledButtonLabelTextColor: colors.texteSombre,
    matFilledButtonHorizontalPadding: "5px",
  }
});

// Styles globaux
globalStyle('body', {
  backgroundColor: colors.fondEcran,
  color: colors.texteSombre,
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
});
