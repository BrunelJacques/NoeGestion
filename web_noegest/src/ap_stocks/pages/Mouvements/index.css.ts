import { style } from '@vanilla-extract/css';


export const tableWrapper = style({
  gridColumn: '2',
  overflow: 'auto', // scroll horizontal + vertical
  minHeight: 0,
  paddingBottom: '80px', // espace pour footer fixe
});

export const table = style({
  borderCollapse: 'collapse',
  width: 'max-content', // permet le scroll horizontal
});

export const th = style({
  position: 'sticky',
  top: 0,
  background: '#fff',
  zIndex: 10,
  borderBottom: '1px solid #ccc',
  padding: '8px',
});

export const td = style({
  padding: '8px',
  borderBottom: '1px solid #eee',
});
