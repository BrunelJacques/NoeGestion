// helloWorld.index.css.ts
import { style } from "@vanilla-extract/css";
import { colors } from "../../assets/styles/colors.css";

export const helloWorld = style({
  backgroundColor: colors.bgRose,
  color: colors.txtGris,
  padding: "20px",
  borderRadius: "8px",
  fontSize: "1.2rem",
  display: "inline-block",
});
