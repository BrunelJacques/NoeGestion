// AppCard.tsx
import type { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../assets/styles/theme.css';
import { container } from './index.css';

interface AppCardProps {
  children: ReactNode;
}

export const AppCard = ({ children }: AppCardProps) => {
  const { theme } = useTheme();

  // On sélectionne la classe de thème générée par Vanilla-Extract
  const themeClass = theme === 'light' ? lightTheme : darkTheme;

  return (
    /* On applique DEUX classes :
       1. themeClass : Définit les valeurs des variables CSS (--color-bg, etc.)
       2. container  : Utilise ces variables pour le style (background-color: var(--color-bg))
    */
    <div className={`${themeClass} ${container}`}>
      {children}
    </div>
  );
};