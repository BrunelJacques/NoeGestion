// assets/styles/global.css.tsx    appelé par main.tsx

import { vars } from './themes.css';
import { globalStyle } from '@vanilla-extract/css';


// Styles globaux
globalStyle('html, body', {
  backgroundColor: vars.color.body,
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

globalStyle('h1, h2, h3, h4, h5, h6,p', {
  margin: '7px 0 0 10px',
  padding: '5px',
});

globalStyle('input', {
  all: 'unset',
  maxWidth: '200px',
  padding: '0.5rem',
  borderRadius: '4px',  
})


globalStyle('.container', {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  flexDirection: 'column',
  alignItems: 'left',
  maxWidth: '400px',
})


globalStyle('.form', {
  marginLeft: '10px',
  padding: '0.6rem',
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px',
  })
