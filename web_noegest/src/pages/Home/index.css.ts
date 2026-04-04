// Home.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'
import { colors } from '../../assets/styles/colors.css'

export const hr = style({
   margin: '20px 0', 
   borderColor: vars.color.border
})

export const local = style({
  background: colors.bglight_card,
  color: colors.txtLink,
  padding: "1rem",
  margin: '20px 50px',
  borderRadius: '5px',
  boxShadow: `0 0 20px 5px ${vars.color.primary}`,
  
})
