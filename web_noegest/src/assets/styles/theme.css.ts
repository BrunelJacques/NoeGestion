import { createThemeContract, createTheme, globalStyle } from '@vanilla-extract/css';

// 1. Le Contrat : Définit les clés dont on a besoin partout
export const vars = createThemeContract({
  color: {
    background: '',
    text: '',
    primary: '',
    surface: '',
    border: '',
  },
  space: {
    small: '4px', // Valeurs fixes communes
    medium: '8px',
  }
});

// 2. Thème Clair
export const lightTheme = createTheme(vars, {
  color: {
    background: '#ffffff',
    text: '#1a1a1a',
    primary: '#3b82f6',
    surface: '#f3f4f6',
    border: '#e5e7eb',
  },
  space: {
    small: '4px',
    medium: '8px',
  }
});

// 3. Thème Sombre
export const darkTheme = createTheme(vars, {
  color: {
    background: '#1a1a1a',
    text: '#f3f4f6',
    primary: '#60a5fa',
    surface: '#2d2d2d',
    border: '#404040',
  },
  space: {
    small: '4px',
    medium: '8px',
  }
});

// 4. Styles Globaux (appliqués au body)
globalStyle('body', {
  backgroundColor: 'yellow',
  color: vars.color.text,
  transition: 'all 0.3s ease-in-out',
  margin: 0,
  padding: 0,
  fontFamily: 'sans-serif'
});


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
