// src/ui/Xinput.css.ts
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'
import { vars } from '../../assets/styles/themes.css'

export const wrapperV = style({
  display: "flex",
  flexDirection: "column",
  position: 'relative',
});

export const wrapperH = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  width: "100%",
})

export const label = style({
  textAlign: "right",
  whiteSpace: "nowrap",
  width: "40%",
  fontSize: '14px',
  fontWeight: 500,
});

export const disabledInput = style({
  opacity: 0.5,
  cursor: "not-allowed",
});

export const baseInput = style({
  width: '60%',
  padding: '3px 5px 3px 10px', // space for icon 2.8rem
  borderRadius: '5px',
  border: `1px solid ${vars.color.border}`,

  selectors: {
    "&:placeholder-shown": { // placeHloder ou blanc
    background: colors.bgInput,
    color: colors.txt_lessdark,
    fontSize: '14px',
    fontWeight: "lighter",
    },
    "&:not(:placeholder-shown)": { // placeHolder null ou masqué par value
    background: colors.bgSaisie,
    color: colors.txt_dark,
    fontSize: '14px',
    fontWeight: "bold",
    },
    '&:hover': { background: 'white'},

    '&:focus': {
      outline: 'none',
      fontSize: '18px',
      borderColor: vars.color.primary,
      background:  colors.bgSaisie,
      color: colors.txtBlack,
      boxShadow: `2px 2px 10px 3px ${vars.color.primary}`,//offsetRight, offsetDown, gradiant, largeur, couleur
    },
  },

})

export const toggleVisibilityStyle = style({
  position: 'absolute',
  right: '0.6rem',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  color: colors.txtDarkGray,
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  opacity: 0.7,
  transition: 'opacity 120ms ease-out',

  ':hover': {
    opacity: 1,
  },
})


export const DateInputStyle = style({
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '18px',
  outline: 'none',
  selectors: {
    '&:focus': {
      borderBlockColor: vars.color.primary,
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)',
    },
  },
});

export const errorStyle = style({
  color: 'red',
  background: colors.bglight_card,
  fontSize: '12px',
  margin: '0 auto 0 44%',
});