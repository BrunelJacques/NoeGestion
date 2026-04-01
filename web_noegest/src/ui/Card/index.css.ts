// Card.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/themes.css'; // On récupère notre contrat global
import { containerStyle } from '../../assets/styles/utilities.css';

export const cardStyle = style({
  [containerStyle]: true, // Utilise les styles de conteneur global
  backgroundColor: vars.color.bgtitle, // Utilise la couleur de surface du thème
  color: vars.color.text,             // Utilise le texte du thème
  borderRadius: '12px',
  border: `1px solid ${vars.color.primary}`, // Bordure basée sur la couleur primaire
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  maxWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  // gap: vars.space.medium,
  transition: 'transform 0.2s ease-in-out, background-color 0.3s ease',

  ':hover': {
    transform: 'translateY(-4px)',
  }
});

export const titleStyle = style({
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: 'bold',
});

export const contentStyle = style({
  fontSize: '0.9rem',
  lineHeight: '1.5',
  opacity: 0.8,
});