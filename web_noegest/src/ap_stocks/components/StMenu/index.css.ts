//src/ap_stocks/components/StMenu/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';
import { colors } from '../../../assets/styles/colors.css.ts';

export const page = style({
  margin: "3px 0 0 3px",
  alignSelf: "center",
})

export const entete = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: "auto",
})

export const boutons = style({
    display: "flexWrap",
    alignItems: "center",
  })

export const altButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: 'center',
  minWidth: "37px",
  backgroundColor: vars.color.secondary,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
  margin: '0 5px',
  padding: 0,
})

export const goBack = style({
  alignSelf: "center",
  width: "30px",
  height: "25px",
});

export const fltOrigine = style({
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: 16,
  marginTop: 5,
})


// styles pour le composant AfficheFiltres
export const fltWrap = style({
  display: "flex", 
  flexWrap: "wrap", 
  gap: "0px",
  padding: "2px",
  fontSize: "14px",
  marginBottom: "auto",
})

export const fltItem = style({
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "100%",
  border: "1px solid #ccc",
  borderRadius: "3px",
  padding: "1px 4px",
  margin: "1px",
})

export const fltKey = style({
  fontWeight: "bold",
  textTransform: "capitalize",
  color: colors.txtDarkGray,
})

export const fltTxt = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  paddingLeft: "3px",
})

export const xlink = style({
  display: "flex",
  margin: "5px auto",
  fontSize: "13px",
  height: "28px"
})