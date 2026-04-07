// src/pages/Login.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'
import { colors } from '../../assets/styles/colors.css'


export const linkStyle = style({
  all: 'unset',
  marginLeft: '0.5rem',
  padding: '2px',
  background: colors.bgSaisie,
  borderTop: '1px solid currentColor',
  borderBottom: '1px solid currentColor',
  color: colors.txtLink,
  ':hover': {
    color: vars.color.primary,
  },
})


