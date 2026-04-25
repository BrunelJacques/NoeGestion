//src/ap_stocks/components/FiltreMvt/index.css.ts
import { style } from '@vanilla-extract/css';


export const debug = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 12,
  background: "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: 6,
  fontFamily: "monospace",
  fontSize: 14,
});

export const ligne = style({
  padding: "4px 0",
});


export const tableauWrapper = style({
  flex: 1,
  overflow: 'auto', // C'est lui qui permet le scroll 2D
  border: '1px solid #ccc',
  position: 'relative', 
});

export const table = style({
  display: 'grid',
  // On définit explicitement les colonnes. 
  // Même en mobile, on veut par exemple 10 colonnes de 150px.
  gridTemplateColumns: 'repeat(10, 150px)', 
  width: 'max-content', // Force la grille à prendre la largeur de ses colonnes
});

//ok ligne entêtes tableau
export const headerRow = style({
  display: 'contents', // Permet aux enfants d'être placés dans la grille du parent
});


export const columnHeader = style({
  position: 'sticky',
  top: 0,
  background: '#fff',
  zIndex: 10,
  padding: '8px',
  borderBottom: '2px solid #000',
  fontWeight: 'bold',
});

export const dataCell = style({
  padding: '8px',
  borderBottom: '1px solid #eee',
  background: '#fff',
});