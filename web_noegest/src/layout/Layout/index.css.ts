//Layout/index.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'


export const layout = style({
  minHeight: '100vh',
  display: 'block',

})


export const outlet = style({
  backgroundColor: vars.color.body,
  color: vars.color.textLower,
  width: '100%',
  padding: "2px 2px 25px 2px", // pour éviter que le contenu soit collé au bord et pour laisser de la place au footer
  minHeight: 0, // Pour que le scroll reste dans <main>
  maxHeight: '100vh', 
  boxSizing: 'border-box',
})

