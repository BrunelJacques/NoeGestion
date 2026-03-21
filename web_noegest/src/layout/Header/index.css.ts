import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../assets/styles/theme.css'

export const header = style({
  color: "var(--text-color)",
  backgroundColor: vars.colors.primary,
  display: 'flex',
  padding: '0 1rem',
  height: '40px',
  alignItems: 'center',
})

export const logo = style({
  height: '40px',
  flexShrink: 0, // logo stays stable
})

export const nav = styleVariants({
  open: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '40px',
    right: 0,
    backgroundColor: vars.colors.primary,
    padding: '0px',

    gap: '7px',
    '@media': {
    'screen and (min-width: 601px)': {
      position: 'static',
      flexDirection: 'row',
      marginLeft: 'auto',
    },
  },
  },
  closed: {
    display: 'none',
    '@media': {
    'screen and (min-width: 601px)': {
      display: 'flex', // visible en desktop
      flexDirection: 'row',
      gap: '7px',
      marginLeft: 'auto',
    },
  },
  },

})

export const burger = style({
  display: 'none',
  fontSize: '24px',
  cursor: 'pointer',

  '@media': {
    'screen and (max-width: 600px)': {
      display: 'block', 
      marginLeft: 'auto',
    },
  },
})