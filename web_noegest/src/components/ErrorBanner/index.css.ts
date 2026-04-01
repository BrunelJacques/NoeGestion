import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/themes.css'; // assuming you have a theme contract


export const wrapper = style({
  margin: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.color.background, // theme-driven
  color: "#a00",
  padding: "12px 16px",
  justifyContent: "space-between",
  borderBottom: "1px solid #e0a0a0",
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
  maxWidth: '60px',
});

export const closeButton = style({
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#a00",
});