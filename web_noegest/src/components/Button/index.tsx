// jeu d'éssai proposé par gemini

import { ReactNode, ButtonHTMLAttributes } from 'react';
// On importe la classe générée par Vanilla-Extract
import { buttonStyle } from './index.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <button 
      className={buttonStyle} // On applique la classe ici
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

