// Card.tsx

import { ReactNode } from "react";
import * as s from "./index.css"

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export const Card = ({ title, description, children }: CardProps) => (
  <div className="card">
    <h3>{title}</h3>
    <h5>{description}</h5>
    <div className={s.contentStyle}>
    {children}
    </div>
  </div>
);
