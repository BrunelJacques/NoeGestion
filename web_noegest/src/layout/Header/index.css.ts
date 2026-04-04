// Header.css.ts

import { style, styleVariants, type CSSProperties } from '@vanilla-extract/css'
import { colors } from '../../assets/styles/colors.css'

export const header = style({
  display: 'flex',
  padding: '0 10px',
  height: '40px',
  alignItems: 'center',
  backgroundColor: colors.bgHeader
})

export const home = style({
  height: '35px',
  padding: '3px 5px 0 0',
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
  marginTop:0,
  padding: 0,
};

const isWideScreen = 'screen and (min-width: 601px)';// breakpoint pour les écrans plus larges que 600px

export const nav = styleVariants({
  open: {
    ...desktopCommon,
    flexDirection: 'column',
    position: 'absolute',
    top: 40,
    right: 7,
    //minHeight: '100%',

    '@media': {
      [isWideScreen]: {
        position: 'static',
        height: '80%',
        ...desktopCommon,
      },
    },
  },

  closed: {
    display: 'none',
    '@media': {
      [isWideScreen]: {
        flexDirection: 'row',
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
  color: colors.bgSaisie,

  '@media': {
    [isWideScreen]: {
    display: 'none',
    
    },
  },
})

export const logout = style({
  height: '80%',
})

export const profile= style({
  height: '25px',
  marginLeft: 5,
  flexShrink: 1
})
