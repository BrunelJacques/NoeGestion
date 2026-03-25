import { style } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/theme.css'

export const buttonStyle = style({
  backgroundColor: vars.color.primary,
  color: vars.color.background, // Le texte prend la couleur du fond du thème opposé
  padding: `${vars.space.medium} 16px`,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  ':hover': {
    filter: 'brightness(1.1)'
  }
});
