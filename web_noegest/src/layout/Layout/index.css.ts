import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'


export const layout = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  transition: 'background-color 0.3s ease, color 0.3s ease', // Optionnel : transition douce
})

export const outlet = style({
  backgroundColor: vars.color.background,
  color: vars.color.text,
  width: '100%',
  flex: 1,
  padding: 4,
})
