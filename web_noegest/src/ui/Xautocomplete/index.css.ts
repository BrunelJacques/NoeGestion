//src/ui/Xautocomplete/index.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '300px',
  fontFamily: 'sans-serif',
});

export const input = style({
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  outline: 'none',
  ':focus': {
    borderColor: '#0070f3',
  },
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '0 0 4px 4px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 10,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
});

export const item = style({
  padding: '10px',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  ':hover': {
    backgroundColor: '#f0f0f0',
  },
});