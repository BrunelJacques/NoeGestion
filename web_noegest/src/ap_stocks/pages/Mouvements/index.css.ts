//src/ap_stocks/pages/Mouvements/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';
import { colors } from '../../../assets/styles/colors.css';


export const flexLigne = style({
  display: 'inline-flex', //width = somme des width des enfants + gap
  gap: 5,
  alignItems: 'center',
  padding: '4px 0',
  borderBottom: `1px solid ${colors.txtLightGray}`,
});


export const ligne = style({
  padding: "4px 0",
});

export const tableauWrapper = style({

  overflow: 'auto', // C'est lui qui permet le scroll 2D
  border: '1px solid #ccc',
  position: 'relative', 
  height: 'calc(100vh)',
  zIndex: 25, 
  color: vars.color.textLower,
  background: vars.color.body,
});

export const table = style({
  display: 'grid',
  // gridTemplateColumns est calculé dynamiquement depuis formFields (voir index.tsx)
  width: 'max-content', //"je ne retrécirai pas !"
  overflow: 'auto', // les cellules peuvent dépasser si elles sont plus larges que leur largeur définie
  maxHeight: '500px', // hauteur pour activer le scroll vertical
});

// ligne entêtes tableau
export const headerRow = style({
  display: 'contents', // Permet aux enfants d'être placés dans la grille du parent
});

export const columnHeader = style({
  position: 'sticky',
  top: 0,
  background: '#fff',
  zIndex: 10,
  padding: '0px',
  borderBottom: `1px solid ${vars.color.border}`,
  fontWeight: 'bold', 
});

export const dataCell = style({
  padding: '2px',
  borderBottom: `thin solid ${colors.txtLightGray}`,
  
});