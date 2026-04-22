//src/stocks/components/MenuFiltre/index.css.ts
import { style } from '@vanilla-extract/css';
import { colors } from '../../../assets/styles/colors.css';


export const filtres = style({
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
  width: "100%",            // mobile : prend toute la ligne
  display: "flex",
  flexDirection: "row",     // mobile : enfants horizontaux
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

export const card = style({
  flex: 1, // prend tout l’espace restant
});