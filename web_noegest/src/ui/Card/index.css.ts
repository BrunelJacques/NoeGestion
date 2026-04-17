// Card.css.ts
import { style } from '@vanilla-extract/css';


export const titleStyle = style({
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: 'bold',
});

export const contentStyle = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 16,
  margin: 10,
  fontSize: '14px',
  lineHeight: '1.5',
});