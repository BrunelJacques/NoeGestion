import { globalStyle } from '@vanilla-extract/css'

/* Reset basique */
globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
})

globalStyle('html, body', {
  height: '100%',
  fontFamily: 'Arial, sans-serif',
})

globalStyle('body', {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
})

/* Liens */
globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
})
