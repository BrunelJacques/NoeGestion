import { style } from '@vanilla-extract/css';

export const inputStyle = style({
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: '#007bff',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)',
    },
  },
});

export const errorStyle = style({
  color: '#dc3545',
  fontSize: '12px',
  marginTop: '4px',
  fontFamily: 'sans-serif',
});