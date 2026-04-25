// src/ui/Xlink.css.ts

import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'
import { vars } from '../../assets/styles/themes.css'

export const baseLink = style({
  textDecoration: 'none',
  padding: 2,
  margin: 3,
  borderRadius: '8px',
  fontWeight: 500,
  transition: '0.2s ease',
  minWidth: '80px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const xLinkRecipe = recipe({
  base: baseLink,

  variants: {
    theme: {
      light: {
        color: colors.txtWhite,
        ':hover': { color: colors.txtDarkGray },
      },
      dark: {
        color: colors.txtWhite,
        ':hover': { color: colors.txtGray },
      },
    },

    isFullLink: {
      true: {
        background: colors.bgLink,
        color: colors.txt_lesslight,
        ':hover': { 
            background: colors.bgInput,
            color: colors.txtGray
          },
      },
      false: {},
    },

    isActive: {
      true: {
        background: colors.bgInput,
        color: colors.txtLink,
        fontWeight: "bold",
        border: `1px solid ${vars.color.border}`,
        borderRadius: '8px',
        boxShadow: `0 0 5px -1px ${vars.color.primary}`,
      },
      false: {
        background: colors.bgLink,
        color: colors.txt_lesslight,

      },
    },
  },

  defaultVariants: {
    theme: 'light',
    isFullLink: false,
  },
})
