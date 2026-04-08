// src/ui/Xinput.css.ts
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'
import { vars } from '../../assets/styles/themes.css'

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const wrapperPassword = style({
  position: 'relative',
})

export const label = style({
  textAlign: "right",
  whiteSpace: "nowrap",
  width: "40%",
  fontSize: '12px',
  fontWeight: 500,
});

export const baseInput = style({
  width: '60%',
  padding: '3px 5px 3px 10px', // space for icon 2.8rem
  borderRadius: '5px',
  border: `1px solid ${vars.color.border}`,
  background: colors.bgInput,
  color: colors.txtDarkGray,
  fontSize: '12px',
  transition:
    'border-color 120ms ease-out, box-shadow 120ms ease-out, background 120ms ease-out',

    ':hover': {
    background: 'white',
  },

  ':focus': {
    outline: 'none',
    fontSize: '18px',
    borderColor: vars.color.primary,
    background:  colors.bgSaisie,
    color: colors.txtBlack,
    boxShadow: `2px 2px 10px 3px ${vars.color.primary}`,//offsetRight, offsetDown, gradiant, largeur, couleur
  },

  '::placeholder': {
    color:  colors.txt_lessdark ,
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

