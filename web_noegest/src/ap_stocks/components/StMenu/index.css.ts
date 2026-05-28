//src/ap_stocks/components/StMenu/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';

export const goBack = style({
  width: "24px",
  height: "24px",
  marginRight: "5px",
});

export const altButton = style({
  marginTop: "auto",
  minWidth: "100px",
  backgroundColor: vars.color.secondary,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
})
