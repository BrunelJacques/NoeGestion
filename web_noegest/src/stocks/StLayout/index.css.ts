// src/stocks/StLayout/index.css.ts
import { style } from "@vanilla-extract/css";
import { colors } from "../../assets/styles/colors.css";


export const layout = style({
  display: "flex",
  flexDirection: "column", // mobile par défaut
  gap: 5,
  height: "calc(100vh - 78px)",

  "@media": {
    "(min-width: 600px)": { // pour grand écran
      flexDirection: "row", // desktop : menu à gauche, card à droite
      alignItems: "flex-start",
    },
  },
});


export const menu = style({
  display: "flex",
  flexDirection: "row",
  backgroundColor: colors.bgFooter,
  color: colors.txtFooter,
  padding: 5,

  "@media": {
    "(min-width: 600px)": { // pour grand écran
      width: 150,           // desktop : largeur fixe à gauche
      flexDirection: "column", // enfants en colonne
      height: "100%",        // prend toute la hauteur du conteneur
    },
  },
});
