// styledLink.css.ts
import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'

export const baseLink = style({
  textDecoration: 'none',
  padding: '8px 8px',
  borderRadius: '10px',
  fontWeight: 500,
  transition: '0.2s ease',
})

export const linkRecipe = recipe({
  base: baseLink,

  variants: {
    theme: {
      light: {
        color: colors.txtNoir,
        ':hover': { color: colors.txtSombre },
      },
      dark: {
        color: colors.txtBlanc,
        ':hover': { color: colors.txtGris },
      },
    },

    isFullLink: {
      true: {
        background: colors.primary,
        color: colors.txtClair,
        ':hover': { 
            background: colors.bgSombre,
            color: colors.txtBlanc

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
