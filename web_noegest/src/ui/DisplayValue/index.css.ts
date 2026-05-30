//src/ui/DisplayValue/index.css.ts
import { recipe } from '@vanilla-extract/recipes';
import { createVar, style } from '@vanilla-extract/css';

export const widthVar = createVar();

export const widthStyle = style({
  minWidth: 80,
  width: widthVar,
});



export const baseDisplayValue = style({
  display: 'inline-flex', // remplace inline-flex pour widthVar
  alignItems: 'center',
  fontFamily: 'sans-serif', 

  padding: 2,
  margin: 3,
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