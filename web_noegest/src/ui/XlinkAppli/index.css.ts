// src/ui/XlinkAppli/index.css.ts
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '../../assets/styles/colors.css'
import { vars } from '../../assets/styles/themes.css';


export const xLinkBase = style({
  display:"flex",
  flexWrap: "wrap",
  border: `1px solid ${vars.color.border}`,
  borderRadius: '8px',
  boxShadow: `0 0 5px -1px ${vars.color.primary}`,
  transition: 'transform 0.2s ease-in-out, background-color 0.3s ease'
})


export const xLinkRecipe = recipe({
   base: xLinkBase,
   variants: {
      disabled: {
      false:{ // actif
        background: colors.bglight_title,
        color: colors.txtLink,
        fontWeight: 600
      },
        true: { // inactif
          background: colors.bglight_secondary,
          fontWeight: 100,
          color: colors.txtGray,
          pointerEvents: "none",
          cursor: "not-allowed",
        }

      }
   }
});


export const cardText = style({
   display:"flex",
   flexWrap: "wrap",
   gap:3,
   padding: "3px 5px",
   maxWidth:160
})

export const image = style({
   width: "70px",
   height: "auto",
   display: "block",      // évite les petits espaces sous l’image
   objectFit: "contain",  // garde les proportions sans rogner
   padding: "5px",
});

