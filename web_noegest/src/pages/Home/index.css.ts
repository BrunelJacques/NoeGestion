// Home.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'
import { colors } from '../../assets/styles/colors.css'

export const hr = style({
   margin: '20px 0', 
   borderColor: vars.color.border
})

export const cardAppli = style({
   display:"flex",
   flexWrap: "wrap",
   background: colors.bgSaisie,
   fontWeight: 600,
})

export const off = style({
   display:"flex",
   flexWrap: "wrap",
   background: colors.bglight_secondary,
   color: "#aaa",
   pointerEvents: "none",
   cursor: "not-allowed",
   fontWeight: 100,
});

export const cardText = style({
   display:"flex",
   flexWrap: "wrap",
   gap:3,
   padding: "3px 5px",
   color: colors.txtLink,   
   maxWidth:160
})

export const image = style({
   width: "70px",
   height: "auto",
   display: "block",      // évite les petits espaces sous l’image
   objectFit: "contain",  // garde les proportions sans rogner
   padding: "5px",
});