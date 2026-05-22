//src/ui/BackButton/index.tsx

import { useNavigate, useLocation } from 'react-router-dom';
import { Xbutton } from '../Xbutton';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  altClassName?: string;
}

function BackButton({
  children,
  altClassName = "",
  ...props}: Props

) {
  const navigate = useNavigate();
  const location = useLocation();

  // On récupère le nom de la page précédente, ou une valeur par défaut
  const previousPageName = location.state?.fromPageName || "Page précédente";

  const handleBack = () => {
    // Le paramètre -1 indique à React Router de reculer d'une page dans l'historique
    navigate(-1);
  };

  return (
    <Xbutton 
    {...props}
      onClick={handleBack}
    >
      
      {children} 
      {previousPageName}
    </Xbutton>
  );
}

export default BackButton;