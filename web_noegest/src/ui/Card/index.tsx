// Card.tsx
import { Xbutton } from '../Xbutton';
import { Xinput} from '../Xinput';

interface CardProps {
  title: string;
  description: string;
  onAction: () => void;
}

export const Card = ({ title, description, onAction }: CardProps) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
    <Xinput placeholder="En attendant children..." 
    onChange={ () => {}}>
      ceci est un child
    </Xinput>
    <Xbutton onClick={onAction}>Action Card</Xbutton>
  </div>
);
