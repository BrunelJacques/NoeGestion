// footer.css.ts
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'

/* export const footer = style({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backdropFilter: 'blur(8px)',
  // pour contenu
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px 0',
  backgroundColor: colors.bgFooter,
  zIndex: 100,
})
 */

//vu
export const footer = style({
  // Si vous voulez éviter l'espace blanc "fantôme", 
  // le passage en position sticky ou relatif est souvent plus sain en mobile
  position: 'sticky', 
  bottom: 0,
  width: '100%',
  height: '40px',
  background: '#333',
  color: '#fff',
  flexShrink: 0,
  zIndex: 100,
});



export const toggleAfficheMode = style({
  border: `1px solid ${colors.txtFooter}`,
  borderRadius: '5px',  
  cursor: 'pointer',
  color: colors.txtFooter,
  backgroundColor: colors.bgFooter,
})
