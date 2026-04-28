//Layout/index.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'; // Importe tes variables


export const layoutContainer = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // force à la taille de l'écran
  width: '100%',
  backgroundColor: vars.color.body,
  color: vars.color.text,
});

