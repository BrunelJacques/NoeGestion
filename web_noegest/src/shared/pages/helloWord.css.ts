// helloWord.css.ts
import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../styles/styles.css";

// Set the body background globally
globalStyle("body", {
  backgroundColor: vars.colors.fondSoutenu,
});

// Style for the HelloWord component
export const helloWord = style({
  backgroundColor: vars.colors.fondSaumon,
  padding: "20px",
  borderRadius: "8px",
  fontSize: "1.2rem",
  color: vars.colors.texteSombre,
  display: "inline-block",
});
