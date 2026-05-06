//src/ap_stocks/components/FiltreMvt/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';


export const debug = style({
  display: "flex",
  flexDirection: "column",
  padding: 3,
  color: vars.color.text,
  background: vars.color.card,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 6,
  fontFamily: "monospace",
  fontSize: 14,
});

export const ligne = style({
  padding: "4px 0",
});


export const wrapper = style({
  flex: 1,
  overflow: 'auto',
  position: 'relative', 
  margin: "0",
});
