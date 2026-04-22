// hello.index.css.ts
import { style } from "@vanilla-extract/css";
import { colors } from "../../assets/styles/colors.css";

export const hello = style({
  backgroundColor: colors.bgSaumon,
  color: colors.txtGray,
  padding: "0 20px",
  margin: "0 10px 0 10px",
  borderRadius: "8px",
  fontSize: "1.2rem",
  display: "inline-block",
});
