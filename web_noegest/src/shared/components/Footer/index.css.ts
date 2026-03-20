// footer.css.ts
import { style } from '@vanilla-extract/css'

export const footerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 0',
})

export const nightModeButton = style({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#8186A0', // your colors.secondary
  paddingTop: '30px',
})
