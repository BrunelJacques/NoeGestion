// Card.tsx
import { cardStyle } from './index.css';
import { Button } from '../Button';

interface CardProps {
  title: string;
  description: string;
  onAction: () => void;
}

export const Card = ({ title, description, onAction }: CardProps) => (
  <div className={cardStyle}>
    <h3>{title}</h3>
    <p>{description}</p>
    <Button onClick={onAction}>Action Card</Button>
  </div>
);

// ancienne proposition
/* import * as styles from './Card.css';
import { Button } from './Button'; // Import du bouton précédent

interface CardProps {
  title: string;
  description: string;
  onAction?: () => void;
}

export default function  Card ({ title, description, onAction }: CardProps) {
  return (
    <div className={styles.cardStyle}>
      <h3 className={styles.titleStyle}>{title}</h3>
      <p className={styles.contentStyle}>{description}</p>
      <Button onClick={onAction}>
        En savoir plus
      </Button>
    </div>
  );
}; */