//src/ap_stocks/components/FiltreMvt/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';
import { breakpoints } from '../../../assets/styles/utilities.css';


export const wrapper = style({
  flex: 1,
  //overflow: 'auto',
  position: 'relative', 
  margin: '5px auto',
});


export const wrapForm = style({
  width: '100%',
  padding: '2px',
  margin: '3px',
  color: vars.color.text,
  background: vars.color.card,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 6,
  boxShadow: `0 0 5px -1px ${vars.color.primary}`,
  fontFamily: "monospace",
  fontSize: 14,
});


export const formStyle = style({
  display: 'grid',
  width: '100%',
  gap: '1px',
  alignContent: 'center',
  gridTemplateColumns: 'repeat(2, 1fr)',
  '@media': {
    [`screen and (max-width: ${breakpoints.mobile})`]: {
      gridTemplateColumns: '1fr',
    },
  },
  padding: '2px',

});

export const entree = style({
  padding: "2px 0",
  margin: '3px',
});

