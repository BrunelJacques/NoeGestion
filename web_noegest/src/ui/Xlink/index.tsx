// src/ui/Xlink.tsx
import { NavLink, useLocation } from 'react-router-dom'
import { xLinkRecipe } from './index.css'
import { capitalize } from '../../utils/string'


type StyledLinkProps = {
  to: string
  children?: React.ReactNode
  $theme?: 'light' | 'dark'
  $isFullLink?: boolean
}

export default function Xlink({
  $theme = 'light',
  $isFullLink,
  ...props
}: StyledLinkProps) {

  const location = useLocation();
  // On récupère la pile existante ou on en crée une vide
  const currentStack = location.state?.pageStack || [];
  const nameLocation = capitalize(location.pathname.split('/').slice(-1)[0] || 'Accueil');
  
  const nextStack = [
    ...currentStack, 
    { name: nameLocation, url: location.pathname }
  ];

  return (
    <NavLink
      to={props.to}
      state={{ pageStack: nextStack }} // On passe la pile mise à jour à la prochaine page
      className={({ isActive }) =>
        xLinkRecipe({
          theme: $theme,
          isFullLink: $isFullLink,
          isActive, // 👈 on passe l’état actif à la recette
        })
      }
    >
      {props.children}
    </NavLink>
  )
}
