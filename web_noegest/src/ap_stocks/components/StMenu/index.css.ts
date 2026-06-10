//src/ap_stocks/components/StMenu/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';

export const page = style({
  margin: "3px 0 0 3px",
  alignSelf: "center",
})

export const goBack = style({
  width: "24px",
  height: "24px",
  marginRight: "5px",
});

export const altButton = style({
  marginTop: "auto",
  minWidth: "1px",
  backgroundColor: vars.color.secondary,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
})


// styles pour le composant AfficheFiltres
export const fltWrap = style({
  display: "flex", 
  flexWrap: "wrap", 
  gap: "4px", 
  padding: "2px",
  fontSize: "14px",
})

export const fltOrigine = style({
  fontWeight: "bold", 
  textTransform: "uppercase",
  fontSize: 16, 
})

export const fltKey = style({
  fontWeight: "bold", 
  textTransform: "capitalize" 
})

export const fltValue = style({
  border: "1px solid #ccc",
  borderRadius: "3px",
  padding: "1px 4px",
  margin: "1px",
  backgroundColor: "#f5f5f5",
  whiteSpace: "nowrap"
})

