//Layout/index.css.ts
import { style } from '@vanilla-extract/css'

export const layoutContainer = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // force à la taille de l'écran
  width: '100%',
});

