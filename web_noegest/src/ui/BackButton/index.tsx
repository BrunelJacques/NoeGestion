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
  ...props}: Props

) {
  const navigate = useNavigate();
  const location = useLocation();

  const pageStack = location.state?.pageStack || [];

  // La page juste avant (la fin du tableau)

  const previousPage = pageStack[pageStack.length - 1]?? {'name': 'Accueil', 'url': '/home'};
  // La page encore avant (l'avant-dernière)
  //const pageAfterNextBack = pageStack[pageStack.length - 2];

  const handleBack = () => {
    // Au lieu de faire navigate(-1), on navigue vers l'URL exacte 
    // en lui passant la pile amputée de son dernier élément
    if (previousPage) {
      navigate(previousPage.url, { 
        state: { pageStack: pageStack.slice(0, -1) } 
      });
    } else {
      navigate('/home'); // Repli si l'historique est vide
    }
  };

  return (
    <Xbutton 
    {...props}
      onClick={handleBack}
    >
      {children} 
      {previousPage?.name}
    </Xbutton>
  );
}

export default BackButton;