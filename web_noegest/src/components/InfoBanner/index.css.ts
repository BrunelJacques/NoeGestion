import type  { CSSProperties }  from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/themes.css';

const titleBase: CSSProperties = {
  flexDirection: 'column',
  fontWeight: 300,
  margin: '10px',
  padding: '3px 5px',
  borderRadius: '5px',
  alignContent: 'center',
};

export const title = style({
  ... titleBase,
  backgroundColor: vars.color.primary,
  color: vars.color.textPrimary,
  border: `1px solid ${vars.color.border}`,
})
