import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/theme.css'; // assuming you have a theme contract

export const wrapper = style({
  margin: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.color.background, // theme-driven
});

export const title = styleVariants({
  light: {
    color: '#000000',
    fontWeight: 300,
  },
  dark: {
    color: '#ffffff',
    fontWeight: 300,
  },
});

export const subtitle = styleVariants({
  light: {
    color: vars.color.primary,
    fontWeight: 300,
  },
  dark: {
    color: '#ffffff',
    fontWeight: 300,
  },
});

export const illustration = style({
  maxWidth: '100%',
});
