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

export const toggleAfficheMode = style({
  border: `1px solid ${colors.bgHeader}`,
  borderRadius: '5px',  
  cursor: 'pointer',
  color: colors.txt_lessdark,
  backgroundColor: colors.bgFooter,
})
