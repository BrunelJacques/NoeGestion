// src/ap_stocks/StLayout/index.css.ts
import { style } from "@vanilla-extract/css";
//import { colors } from "../../assets/styles/colors.css";


//vu
export const domainLayout = style({
  display: 'flex',
  flexDirection: 'column', // Empile Menu et Tableau en mobile
  flex: 1,
  padding: '10px',
  gap: '10px',
  minHeight: 0, // IMPORTANT pour permettre aux enfants de scroller en flex
  maxHeight: 'calc(100vh - 78px)', // pour éviter que le contenu dépasse la hauteur de l'écran (78px = header + footer)
  
  '@media': {
    'screen and (min-width: 600px)': {
      flexDirection: 'row', // Menu à gauche en desktop
    },
  },});


/* à intégrer si nécessaire 
export const layout = style({
  display: "block",
  flexDirection: "column", // mobile par défaut
  gap: 5,
  height: "calc(100vh - 78px)",

  "@media": {
    "(min-width: 600px)": { // pour grand écran
      flexDirection: "row", // desktop : menu à gauche, card à droite
      alignItems: "flex-start",
    },
  },
}); */
 

/* à intégrer pour menu
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
 */

//vu
export const menu = style({
  width: '100%', // Mobile : prend toute la largeur
  background: '#f9f9f9',
  border: '1px solid #ccc',
  position: 'sticky',
  top: 0,
  zIndex: 20,
  
  '@media': {
    'screen and (min-width: 600px)': {
      width: '150px', // Desktop : largeur fixe
      alignSelf: 'start',
      height: '300px',
    },
  },
});

