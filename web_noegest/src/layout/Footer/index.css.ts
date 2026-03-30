// footer.css.ts
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  verticalAlign: 'center',
  justifyContent: 'center',
  padding: '6px 0',
  backgroundColor: colors.bgFooter,
})

export const nightLightBtn = style({
  border: 'none',
  cursor: 'pointer',
  color: colors.txtBlanc,
  backgroundColor: colors.bgHeader,
})
