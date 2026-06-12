//src/ap_stocks/pages/OneMvt/index.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../assets/styles/themes.css';
import { colors } from '../../../assets/styles/colors.css';
import { breakpoints } from '../../../assets/styles/utilities.css';


export const wrapper = style({
  flex: 1,
  //overflow: 'auto',
  position: 'relative',
  margin: '5px',
});


export const wrapForm = style({
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

export const goBack = style({
  width: "24px",
  height: "24px",
  marginRight: "5px",
});


export const boutons = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '10px',
});

export const columnHeader = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '10px',
});

export const altButton = style({
  backgroundColor: vars.color.secondary,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
})
