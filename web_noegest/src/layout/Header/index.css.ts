// Header.css.ts

import { style, styleVariants, type CSSProperties } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'

export const header = style({
  display: 'flex',
  padding: '0 10px',
  height: '43px',
  alignItems: 'center',
  backgroundColor: colors.bgHeader
})

export const home = style({
  height: '30px',
  padding: '0 5px 0 0',
  flexShrink: 0, // logo stays stable
})

export const logo = style({
  height: '40px',
  flexShrink: 0, // logo stays stable
})

const desktopCommon: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '2px',
  marginLeft: 'auto',
  marginRight: 5,
};

const desktop = 'screen and (min-width: 601px)';// breakpoint pour les écrans plus larges que 600px

export const nav = styleVariants({
  open: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 40,
    right: 7,
    padding: 0,
    marginTop: 3,
    marginRight: 3,
    gap: '4px',
    '@media': {
      [desktop]: {
        position: 'static',
        ...desktopCommon,
      },
    },
  },

  closed: {
    display: 'none',
    '@media': {
      [desktop]: {
        ...desktopCommon,
      },
    },
  },
});

export const burger = style({
  fontSize: '24px',
  cursor: 'pointer',
  display: 'block', 
  marginLeft: 'auto',
  marginRight: 7,

  '@media': {
    [desktop]: {
    display: 'none',
    
    },
  },
})

export const logout = style({
  
})