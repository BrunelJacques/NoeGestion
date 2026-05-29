// src/ui/Xbutton/index.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'


export const altDefault = style({
  backgroundColor: vars.color.primary,
  color: vars.color.textPrimary,
  border: `1px solid ${vars.color.text}`,
})


export const baseStyle = style({
  display: 'flex', // Flexbox pour aligner l'image et le texte 
  justifyContent: 'center',// Centre verticalement l'image et le texte 
  alignItems: 'center', // Centre horizontalement l'image et le texte
  gap: '3px', // Espace entre l'image et le texte
  margin: '5px 5px 5px auto',
  minWidth: '80px',

  padding: '1px 5px',
  borderRadius: '10px',
  alignContent: 'center',
  
  fontSize: '0.95rem',
  fontWeight: 550,
  letterSpacing: '0.003rem',

  // behavior
  cursor: 'pointer',
  transition:
    'transform 120ms ease-out, box-shadow 120ms ease-out, background 160ms ease-out, border-color 160ms ease-out',

  // subtle shadow
  boxShadow: '0 4px 10px rgba(15, 23, 42, 0.25)',

  // label inside button
  selectors: {

    '&:hover:not(:disabled)': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(15, 23, 42, 0.35)',
      background: 'linear-gradient(135deg, #4338ca, #4f46e5)',
      color: vars.color.textPrimary,
      borderColor: vars.color.border,
    },

    // active
    '&:active:not(:disabled)': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.3)',
      filter: 'brightness(1.1)'
    },

    // focus-visible
    '&:focus-visible': {
      outline: '2px solid #e5e7eb',
      outlineOffset: '3px',
    },

    // disabled
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
      boxShadow: 'none',
      background: vars.color.secondary,
      color: vars.color.textLower,
      borderColor: vars.color.border,
    },
  },
})

export const label = style({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  fontSize: '14px',
})

export const ellipsis = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})
