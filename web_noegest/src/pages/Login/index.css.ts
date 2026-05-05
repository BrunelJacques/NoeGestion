// src/pages/Login.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'
import { colors } from '../../assets/styles/colors.css'


export const containerLinks = style({
  display: 'flex',
  flexWrap: 'wrap', // Permet le passage à la ligne si l'espace est insuffisant
  gap: '1rem 2rem', // Espace horizontal et vertical entre les blocs
  justifyContent: 'center', // Centre les blocs sur la ligne
  marginTop: '0.5rem',
})
export const yycontainerLinks = style({
  display: 'flex',
  flexWrap: 'wrap', // Permet le passage à la ligne si l'espace est insuffisant
  gap: '1rem 2rem', // Espace horizontal et vertical entre les blocs
  justifyContent: 'center', // Centre les blocs sur la ligne
  alignItems: 'baseline',
  marginTop: '1.5rem',
  width: '100%',
});

export const wrapLink = style({
  display: 'flex',
  gap: '0.5rem',
})

export const yywrapLink = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: '0.5rem',
  margin: 0, // Reset de la marge par défaut des h5
  fontSize: '0.9rem',
  fontWeight: 400,
  color: '#4b5563', // Gris neutre (exemple)
  whiteSpace: 'nowrap', // Empêche le texte interne d'un bloc de se couper
});


export const linkStyle = style({ 
  display: 'inline-block', // Link par défaut inline refuse les marges top et bottom
  background: colors.bgSaisie,
  borderTop: '1px solid currentColor',
  color: colors.txtLink,
  ':hover': {
    color: vars.color.primary,
  },
})

