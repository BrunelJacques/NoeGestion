// helloWord.css.ts
import { style, globalStyle } from "@vanilla-extract/css";
import { varsGlobal } from "../../styles/styles.css";

// Set the body background globally
globalStyle("body", {
  backgroundColor: varsGlobal.colors.fondEcran,
});

// Style for the HelloWord component
export const helloWord = style({
  backgroundColor: varsGlobal.colors.fondSaumon,
  padding: "20px",
  borderRadius: "8px",
  fontSize: "1.2rem",
  color: varsGlobal.colors.texteSombre,
  display: "inline-block",
});
