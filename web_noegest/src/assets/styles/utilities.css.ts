import { vars } from "./themes.css"
import { style } from '@vanilla-extract/css'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: vars.space.medium,
})

export const errorStyle = style({
  color: vars.color.secondary,
  fontWeight: 'bold',
})
