// header.css.ts
import { style } from '@vanilla-extract/css'

export const homeLogo = style({
  height: '40px',
})

export const navContainer = style({
  padding: '10px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const linksWrapper = style({
  display: 'flex',
  gap: '20px',
})
