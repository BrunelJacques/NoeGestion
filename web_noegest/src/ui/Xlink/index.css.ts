// src/ui/Xlink.css.ts

import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'

export const baseLink = style({
  textDecoration: 'none',
  padding: 3,
  height: '90%',
  borderRadius: '10px',
  fontWeight: 500,
  transition: '0.2s ease',
  minWidth: '80px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const linkRecipe = recipe({
  base: baseLink,

  variants: {
    theme: {
      light: {
        color: colors.txtBlanc,
        ':hover': { color: colors.txtMid },
      },
      dark: {
        color: colors.txtBlanc,
        ':hover': { color: colors.txtGris },
      },
    },

    isFullLink: {
      true: {
        background: colors.bgLink,
        color: colors.txt_lesslight,
        ':hover': { 
            background: colors.bgHeader,
            color: colors.txtGris

          },
      },
      false: {},
    },
  },

  defaultVariants: {
    theme: 'light',
    isFullLink: false,
  },
})
