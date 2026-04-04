// src/ui/Xinput.css.ts

import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'

export const inputStyle = style({
  width: '100%',
  padding: '0.6rem 2.8rem 0.6rem 1rem', // space for icon 2.8rem
  borderRadius: '8px',
  border: '1px solid #c5c5c5',

  background: colors.bgSaisie,
  color: colors.txt_dark,
  fontSize: '1rem',

  transition:
    'border-color 120ms ease-out, box-shadow 120ms ease-out, background 120ms ease-out',

  ':hover': {
    background: 'red',
  },

  ':focus': {
    outline: 'none',
    borderColor: '#6366f1',
    background:  colors.bgSaumon,
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)',
  },

  '::placeholder': {
    color:  colors.txt_lessdark ,
  },
})

export const inputWrapperStyle = style({
  position: 'relative',
  width: '100%',
})

export const toggleVisibilityStyle = style({
  position: 'absolute',
  right: '0.6rem',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.1rem',
  opacity: 0.7,
  transition: 'opacity 120ms ease-out',

  ':hover': {
    opacity: 1,
  },
})

/* export const eyeIconStyle = style({
  width: '1.2rem',
  height: '1.2rem',
  fill: '#6b7280',
  position: "absolute",
  right: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "1.2rem" 
})*/
