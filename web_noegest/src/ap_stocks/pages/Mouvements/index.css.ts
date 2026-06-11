//src/ap_stocks/pages/Mouvements/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';
import { colors } from '../../../assets/styles/colors.css';

export const tableauWrapper = style({
  display: 'flex',
  overflow: 'auto', // C'est lui qui permet le scroll 2D
  border: '1px solid #ccc',
  position: 'relative', 
  height: 'calc(100vh)',
  zIndex: 25, 
  color: vars.color.textLower,
  background: vars.color.body,
});

export const grid = style({
  display: 'grid',
  // gridTemplateColumns est calculé dynamiquement depuis formFields (voir index.tsx)

  overflow: 'auto', // les cellules peuvent dépasser si elles sont plus larges que leur largeur définie
  maxHeight: 'calc(100% - 65px )', // hauteur pour activer le scroll vertical
  marginLeft: 5,
  gridAutoRows: 'max-content',
  justifyContent: 'center'
});

export const columnHeader = style({
  display: 'flex',
  justifyContent: 'center', // pour un nom court
  textAlign: 'center', // pour un nom fractionné sur deux lignes
  position: 'sticky',
  top: 0,
  background: vars.color.body,
  zIndex: 10,
  padding: '0px',
  borderLeft: `thin solid ${colors.txtLightGray}`,
  fontWeight: 'bold', 
  fontSize: '14px',
});

export const dataCell = style({
  padding: '1px',
  borderBottom: `thin solid ${colors.txtLightGray}`,
});

