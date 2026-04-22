//src/stocks/components/MenuFiltre/index.css.ts
import { style } from '@vanilla-extract/css';


export const filtres = style({
  display: "flex",
  flexDirection: "column", // mobile par défaut
  gap: 5,

  "@media": {
    "(min-width: 600px)": {
      flexDirection: "row", // desktop : menu à gauche, card à droite
      alignItems: "flex-start",
    },
  },
});


export const menu = style({
  width: "100%",            // mobile : prend toute la ligne
  display: "block",
  flexDirection: "row",     // mobile : enfants horizontaux


  "@media": {
    "(min-width: 600px)": {
      width: 150,           // desktop : largeur fixe à gauche
      flexDirection: "column", // enfants en colonne
    },
  },
});

export const card = style({
  flex: 1, // prend tout l’espace restant
});