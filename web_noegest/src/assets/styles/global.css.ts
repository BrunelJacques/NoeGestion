// assets/styles/global.css.tsx    appelé par main.tsx

import { vars } from './themes.css';
import { globalStyle } from '@vanilla-extract/css';

/* 
export const varsGlobal = createGlobalTheme(':root', {
// double emploi avec colors appellées directement
color: {
    primary: 'blue',
    secondary: 'red',
  },
  space: {
    small: '4px',
    medium: '8px',
  },
});
 */

// Styles globaux
globalStyle('html, body', {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  minHeight: '100vh',
  width: '100%',
  maxWidth: 1000,
 // Optionnel : transition douce 
  transition: 'background-color 0.3s ease, color 0.3s ease'
})


globalStyle('*', {
  boxSizing: 'border-box',
})