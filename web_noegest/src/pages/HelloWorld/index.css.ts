// helloWorld.css.ts
import { style, } from "@vanilla-extract/css";
import { varsGlobal } from "../../assets/styles/zzzstyles.css";

// Style for the HelloWorld component
export const helloWorld = style({
  backgroundColor: varsGlobal.colors.fondRose,
  padding: "20px",
  borderRadius: "8px",
  fontSize: "1.2rem",
  color: varsGlobal.colors.texteSombre,
  display: "inline-block",
});
