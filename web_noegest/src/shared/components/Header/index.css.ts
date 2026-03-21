import { style } from '@vanilla-extract/css'

export const headerContainer = style({
  color: "var(--text-color)",
  backgroundColor:"#3f729b",
  display: 'flex',
  padding: '0 1rem',
  height: '40px',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const logo = style({
  height: '40px',
  flexShrink: 0, // logo stays stable
})

export const navContainer = style({
  display: 'flex',
  marginLeft: 'auto',
  justifyContent: 'flex-end',
  gap: '7px',
  padding: '5px',

  minWidth: 0, // 🔥 VERY IMPORTANT: allows shrinking

  '@media': {
    'screen and (max-width: 600px)': {
      display: 'none', // 🔥 cache les liens en mobile
    },
  },
})

export const burger = style({
  display: 'none',
  marginLeft: 'auto',
  fontSize: '24px',
  cursor: 'pointer',

  '@media': {
    'screen and (max-width: 600px)': {
      display: 'block', // 🔥uniquement en mobile
    },
  },
})