//src/ui/DisplayValue/index.css.ts
import { recipe } from '@vanilla-extract/recipes';
import { createVar, style } from '@vanilla-extract/css';

export const widthVar = createVar();

export const widthStyle = style({
  minWidth: "33px",
  width: widthVar,
});


export const baseDisplayValue = style({
  display: 'inline-flex', 
  justifySelf: 'center',
  fontFamily: 'serif', 
  fontSize: '12px',

  paddingRight: 6,
  margin: 0,
  borderRadius: '8px',
  fontWeight: 300,
  transition: '0.2s ease',
})


export const displayRecipe = recipe({
  base: baseDisplayValue,

  variants: {
    justify: {
      left: { justifyContent: 'flex-start', textAlign: 'left' },
      center: { justifyContent: 'center', textAlign: 'center' },
      right: { justifyContent: 'flex-end', textAlign: 'right' },
    },

  },
  defaultVariants: {
    justify: 'left',
  },
});