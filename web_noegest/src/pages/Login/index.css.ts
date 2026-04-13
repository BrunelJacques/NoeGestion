// src/pages/Login.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'
import { colors } from '../../assets/styles/colors.css'



export const containlink = style({
  display: 'flex',
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: 'auto',
  gap: '5px',
  alignContent: 'center',
  justifyContent: 'space-evenly'
})


export const linkStyle = style({ 
  display: 'inline-block', // Link par défaut inline refuse les marges top et bottom
  marginTop: '5px',
  background: colors.bgSaisie,
  borderTop: '1px solid currentColor',
  color: colors.txtLink,
  ':hover': {
    color: vars.color.primary,
  },
})


export const inlineBlock = style({
  display: 'inline-block',
  width: 'fit-content',
  margin: '5px auto 0 auto',
})

export const marginlink = style({  
  marginTop: '15px'
})

