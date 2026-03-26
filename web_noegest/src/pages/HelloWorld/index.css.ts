// helloWorld.index.css.ts
import { style } from "@vanilla-extract/css";
import { varsGlobal } from "../../assets/styles/global.css.ts";


export const helloWorld = style({
  backgroundColor: varsGlobal.colors.fondRose,
  color: varsGlobal.colors.texteGris,
  padding: "20px",
  borderRadius: "8px",
  fontSize: "1.2rem",
  display: "inline-block",
});
