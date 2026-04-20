// AppCard.tsx
import type { ReactNode } from 'react';
import * as s from './index.css.ts';

interface AppCardProps {
  children: ReactNode;
}

export const AppCard = ({ children }: AppCardProps) => {

  return (
    <div className={`${s.appCard} container`}>
      {children}
    </div>
  );
};