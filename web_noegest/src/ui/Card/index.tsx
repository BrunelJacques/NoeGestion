// Card.tsx

import { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const Card = ({ title, description, children }: CardProps) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
    {children}
  </div>
);
