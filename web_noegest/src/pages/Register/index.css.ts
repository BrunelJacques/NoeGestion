// Register.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/themes.css'
import { breakpoints } from '../../assets/styles/utilities.css';


export const cardGrid = style({
  display: 'grid',
  margin: '15px 4px',
  width: '100%',
  
  gap: '10px',
  alignContent: 'center',
  gridTemplateColumns: 'repeat(2, 1fr)',
  '@media': {
    [`screen and (max-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: '1fr',
    },
  },
});


export const localCard = style({ 
  //maxWidth: '800px',
  display: "flex",
  flexDirection: "row",
  margin: '10px auto',
  background: vars.color.card, // Utilise la couleur de surface du thème
  color: vars.color.text,             // Utilise le texte du thème

 ':hover': {
    transform: 'translateY(-4px)',
  }
})

export const localForm = style({ 
  display: "block",
  width: "100%",
})