//Layout/index.css.ts
import { style } from '@vanilla-extract/css'

//vu
export const layoutContainer = style({
  display: 'flex',
  flexDirection: 'column',
  // On utilise min-height pour s'assurer que le footer est au moins en bas de l'écran
  minHeight: '100vh', 
  width: '100%',
});


/*  à intégrer pour outlet
export const outlet = style({
  backgroundColor: vars.color.body,
  color: vars.color.textLower,
  width: '100%',
  padding: "2px 2px 25px 2px", // pour éviter que le contenu soit collé au bord et pour laisser de la place au footer
  minHeight: 0, // Pour que le scroll reste dans <main>
  maxHeight: '100vh', 
  boxSizing: 'border-box',
})

 */