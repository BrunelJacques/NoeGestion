// helloWorld.index.css.ts
import { style } from "@vanilla-extract/css";
import { colors } from "../../assets/styles/colors.css";
import { vars } from '../../assets/styles/themes.css'

export const helloWorld = style({
  backgroundColor: colors.bgRose,
  color: colors.txtGris,
  padding: "20px",
  borderRadius: "8px",
  fontSize: "1.2rem",
  display: "inline-block",
});

export const local = style({
  background: colors.bglight_card,
  color: colors.txtLink,
  padding: "1rem",
  margin: '20px 50px',
  borderRadius: '5px',
  boxShadow: `0 0 20px 5px ${vars.color.primary}`,
  
})
