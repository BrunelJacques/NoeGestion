// assets/styles/global.css.tsx    appelé par main.tsx

import { vars } from './themes.css';
import { globalStyle } from '@vanilla-extract/css';


// Styles globaux
globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  width: '100%',
  maxWidth: 1000,
  transition: 'background-color 1.3s ease, color 1.3s ease'  
})

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('h3, h4',{
  fontSize: '18px',
});

globalStyle('h5, h6',{
  fontSize: '14px',
});

globalStyle('h7, h8',{
  fontSize: '12px',
});


globalStyle('h1, h2, h3', {
  margin: '5px 0 0 7px',
  padding: '0',
});

globalStyle('h4, h5, h6,p', {
  margin: '5px 0 0 15px',
  padding: '0',
});

globalStyle('p',{
  fontSize: '14px',
  fontWeight: '500',
})


globalStyle('input', {
  all: 'unset',
  maxWidth: '200px',
  padding: '0.5rem',
  borderRadius: '4px',  
})

globalStyle('hr',{
  border: 'none',
  height: '1px',
  background: `linear-gradient(to right, transparent, ${vars.color.primary}, transparent)`,
  margin: '7px 0',
})

globalStyle('.discret',{
 background: "transparent",
})

const baseContainer = {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '700px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.body,
  color: vars.color.text,
  transition: 'background-color 0.6s ease, color 0.6s ease',
} as const; // "as const" permet de garder un typage strict

globalStyle('.container', {
  ...baseContainer,
});

// Style pour .pageContainer
globalStyle('.pageContainer', {
  ...baseContainer,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 100px)',
});

globalStyle('.subContainer', {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  justifyContent: 'space-evenly',
  width: 'fit-content',
})

globalStyle('.form', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
  padding: '0.6rem',
  gap: '1rem',
  maxWidth: '300px',
  })

  
globalStyle('.card', {
  display: 'flex',
  flexDirection: 'column',
  margin: "10px auto 0 auto",
  background: vars.color.card, // Utilise la couleur de surface du thème
  color: vars.color.text,             // Utilise le texte du thème
  borderRadius: '8px',
  boxShadow: `0 0 5px -1px ${vars.color.primary}`,
  transition: 'transform 0.2s ease-in-out, background-color 0.3s ease'
})
