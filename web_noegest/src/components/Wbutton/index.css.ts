// Wbutton.css.ts
import { style } from '@vanilla-extract/css'

export const fancyButton = style({
  // layout
  padding: '0.6rem 1.4rem',
  borderRadius: '11px',
  border: '3px solid #c5c5c5',

  // colors & text
  background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
  color: '#f3f4f6',
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
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 16px rgba(15, 23, 42, 0.35)',
      background: 'linear-gradient(135deg, #4338ca, #4f46e5)',
      borderColor: '#a5b4fc',
    },

    // active
    '&:active:not(:disabled)': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.3)',
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
      background: '#9ca3af',
      borderColor: '#9ca3af',
    },
  },
})
