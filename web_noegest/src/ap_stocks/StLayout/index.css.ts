// src/ap_stocks/StLayout/index.css.ts
import { style } from "@vanilla-extract/css";
import { colors } from "../../assets/styles/colors.css";
import { vars } from "../../assets/styles/themes.css";
//import { colors } from "../../assets/styles/colors.css";


export const domainLayout = style({
  display: 'flex',
  flexDirection: 'column', // Empile Menu et Tableau en mobile
  flex: 1,
  padding: '3px 0',
  gap: '3px',
  minHeight: 0, // IMPORTANT pour permettre aux enfants de scroller en flex
  maxHeight: 'calc(100vh - 70px)', // pour éviter que le contenu dépasse la hauteur de l'écran (78px = header + footer)
  backgroundColor: vars.color.body,
  color: vars.color.textLower,

  '@media': {
    'screen and (min-width: 600px)': {// pour grand écran
      flexDirection: 'row', // Menu à gauche en desktop
    },
  },});

 

export const menu = style({
  display: "flex",
  flexDirection: "row",
  width: '100%', // Mobile : prend toute la largeur
  border: `2px solid ${vars.color.border}`, // pour éviter que le menu dépasse la hauteur de l'écran
  position: 'sticky',
  top: 0,
  zIndex: 20,
  background: colors.bgFooter,
  color: colors.txtFooter,
  padding: 5,

  '@media': {
    'screen and (min-width: 600px)': {
      flexDirection: "column", // enfants en colonne
      height: 'calc(100vh - 75px)', // 100% ne prend pastoute la hauteur du conteneur!!
      width: '150px', // Desktop : largeur fixe
      alignSelf: 'start',
      
    },
  },
});

