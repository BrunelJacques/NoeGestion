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

export const footer = style({
  gridRow: '2',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '60px',
  background: '#eee',
  zIndex: 100,
});



export const toggleAfficheMode = style({
  border: `1px solid ${colors.txtFooter}`,
  borderRadius: '5px',  
  cursor: 'pointer',
  color: colors.txtFooter,
  backgroundColor: colors.bgFooter,
})
