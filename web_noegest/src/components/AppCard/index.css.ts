import { style } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/theme.css';

export const container = style({
  backgroundColor: vars.color.background,
  color: vars.color.text,
  minHeight: '100vh',
  width: '100%',
  transition: 'background-color 0.3s ease, color 0.3s ease', // Optionnel : transition douce
});