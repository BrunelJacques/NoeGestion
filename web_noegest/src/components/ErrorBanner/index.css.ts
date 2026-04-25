import { CSSProperties, style, styleVariants } from '@vanilla-extract/css';
import { colors } from '../../assets/styles/colors.css';  


export const errorBanner = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: "4px",
  justifyContent: "space-between",
  flexShrink: 0, 
  backgroundColor: colors.bgRose,
  borderBottom: "1px solid #e0a0a0",
  margin: '0',
});


const titleBase: CSSProperties = {
  flexDirection: 'column',
  fontWeight: 300, 
  width: '100%',
  marginLeft: '20px',
};

export const title = styleVariants({
  light: {
    ...titleBase,
    color: colors.txt_dark, // theme-driven
  },
  dark: {
    ...titleBase,
    backgroundColor: colors.bgRose,
    color: colors.txtLink,
  },
});


export const illustration = style({
  backgroundColor: colors.bgBordeaux,
  padding: '0 2px',
});

export const closeButton = style({
  border: "none",
  fontSize: "20px",
  backgroundColor: "transparent",
  color: "#a00",
  borderBlock: "1px solid",
  borderBlockColor: colors.bgBordeaux,
  marginLeft: "10px",

});