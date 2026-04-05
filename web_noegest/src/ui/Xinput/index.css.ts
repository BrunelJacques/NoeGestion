// src/ui/Xinput.css.ts

import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'
import { vars } from '../../assets/styles/themes.css'

export const inputStyle = style({
  width: '100%',
  padding: '0.3rem 2.8rem 0.3rem 1rem', // space for icon 2.8rem
  borderRadius: '8px',
  border: `1px solid ${vars.color.border}`,


  background: colors.bglight_body,
  color: colors.txtDarkGray,
  fontSize: '16px',

  transition:
    'border-color 120ms ease-out, box-shadow 120ms ease-out, background 120ms ease-out',

  ':hover': {
    background: 'white',
  },

  ':focus': {
    outline: 'none',
    fontSize: '18px',
    borderColor: vars.color.primary,
    background:  colors.bgSaisie,
    color: colors.txtBlack,
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

