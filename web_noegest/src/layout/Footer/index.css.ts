// footer.css.ts
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'



export const footer = style({
  // Pour éviter l'espace blanc "fantôme" vérifier minHeight:0 sur tous les parents en flex, 
  // le passage en position sticky ou relatif est souvent plus sain que fixed en mobile
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  //position: 'sticky', 
  //bottom: '10px', // pour éviter que le footer soit collé au bord de l'écran en mobile
  width: '100%',
  height: '30px',
  color: '#fff',
  flexShrink: 0,
  zIndex: 1,
  padding: '6px 0',
  background: colors.bgFooter,
});



export const toggleAfficheMode = style({
  border: `1px solid ${colors.txtFooter}`,
  borderRadius: '5px',  
  cursor: 'pointer',
  color: colors.txtFooter,
  backgroundColor: colors.bgFooter,
})
