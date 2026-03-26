import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'


export const hr = style({
   margin: '20px 0', 
   borderColor: vars.color.border
})

export const red = style({
  background: 'red',
  color: "var(--color-text)",
  border: "1px solid green",
  padding: "1rem",
})
