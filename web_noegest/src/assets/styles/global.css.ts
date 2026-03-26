// assets/styles/global.css.ts
import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';
import { colors } from './colors.css';

export const varsGlobal = createGlobalTheme(':root', {
  colors,
  layout: {
    maxWidthField: "210px",
  },
  misc: {
    mdcFilledButtonLabelTextColor: colors.txtSombre,
    matFilledButtonHorizontalPadding: "5px",
  }
});

// Styles globaux
globalStyle('body', {
  backgroundColor: colors.bgEcran,
  color: colors.txtSombre,
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
});
