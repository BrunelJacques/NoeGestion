// src/pages/Login.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'
import { colors } from '../../assets/styles/colors.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '15%',
  alignItems: 'left',
  justifyContent: 'c',
})

export const formStyle = style({  
  margin: 'auto',
  padding: '0.6rem',
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px',
  })

export const linkStyle = style({
  marginLeft: '0.5rem',
  padding: '0.3rem',
  background: colors.bglight_body,
  color: colors.txtLink,
  textDecoration: 'overline underline',
  textUnderlineOffset: '3px',
  ':hover': {
    color: vars.color.primary,
  },
})

export const btnStyle = style({ 
  marginLeft: 'auto',
  minWidth: '110px',
  backgroundColor: vars.color.primary,
  color: vars.color.textPrimary,
  border: `1px solid ${vars.color.border}`,
})

