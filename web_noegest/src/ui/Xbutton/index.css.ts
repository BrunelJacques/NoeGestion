// src/ui/Xbutton/index.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'


export const altDefault = style({
  backgroundColor: vars.color.primary,
  color: vars.color.altText,
  border: '3px solid {vars.color.text}',
})

export const baseStyle = style({
// On attache le style au layer 'base', il n'aura pas priorité sur les styles d'altClassName
  padding: '7px 10px',
  margin: '5px', 
  borderRadius: '11px',
  
  fontSize: '0.95rem',
  fontWeight: 500,
  letterSpacing: '0.03em',

  // behavior
  cursor: 'pointer',
  transition:
    'transform 120ms ease-out, box-shadow 120ms ease-out, background 160ms ease-out, border-color 160ms ease-out',

  // subtle shadow
  boxShadow: '0 4px 10px rgba(15, 23, 42, 0.25)',

  // hover
  selectors: {
    '&:hover:not(:disabled)': {
      transform: 'translateY(-6px)',
      boxShadow: '0 6px 16px rgba(15, 23, 42, 0.35)',
      background: 'linear-gradient(135deg, #4338ca, #4f46e5)',
      borderColor: vars.color.border,
    },

    // active
    '&:active:not(:disabled)': {
      transform: 'translateY(-3px)',
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
      color: vars.color.altText,
      borderColor: vars.color.border,
    },
  },
})
