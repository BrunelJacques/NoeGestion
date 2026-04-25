//Layout/index.css.ts
import { style } from '@vanilla-extract/css'


export const appLayout = style({
  display: 'grid',
  //gridTemplateRows: 'auto auto 1fr auto', // header, error, contenu, footer
  gridTemplateRows: '1fr auto', //  footer fixe seul
  height: '100vh',
});

export const scrollArea = style({
  overflow: 'hidden', 
  minHeight: 0,
});

export const domainLayout = style({

  display: 'grid',
  gridTemplateColumns: '150px 1fr', // menu + contenu
  overflow: 'auto', 
  minHeight: 0, // indispensable pour scroll interne
});


// old version à intégrer
/* export const layout = style({
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

 */