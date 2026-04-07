import { style } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/themes.css';
import { colors } from "../../assets/styles/colors.css";

export const hrstyle = style({
   margin: '20px 0', 
   borderColor: vars.color.border
})

export const localStyle = style({
  background: colors.bglight_card,
  color: colors.txtLink,
  padding: "1rem",
  margin: '20px 50px',
  borderRadius: '5px',
  boxShadow: `2px 4px 20px 5px ${vars.color.primary}`,
  
})
