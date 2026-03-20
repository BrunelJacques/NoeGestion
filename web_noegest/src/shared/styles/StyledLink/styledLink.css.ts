// styledLink.css.ts
import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

export const baseLink = style({
  textDecoration: 'none',
  padding: '10px 15px',
  borderRadius: '8px',
  fontWeight: 500,
  transition: '0.2s ease',
})

export const linkRecipe = recipe({
  base: baseLink,

  variants: {
    theme: {
      light: {
        color: '#222',
        ':hover': { color: '#555' },
      },
      dark: {
        color: '#fff',
        ':hover': { color: '#ddd' },
      },
    },

    isFullLink: {
      true: {
        background: '#4e6cff',
        color: 'white',
        ':hover': { background: '#3d55cc' },
      },
      false: {},
    },
  },

  defaultVariants: {
    theme: 'light',
    isFullLink: false,
  },
})
