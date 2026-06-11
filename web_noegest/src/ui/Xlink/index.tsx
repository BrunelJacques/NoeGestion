// src/ui/Xlink.tsx
import { NavLink, useLocation } from 'react-router-dom'
import { xLinkRecipe } from './index.css'
import { capitalize } from '../../utils/string'


type StyledLinkProps = {
  to: string
  children?: React.ReactNode
  $theme?: 'light' | 'dark'
  $isFullLink?: boolean
  altClassName?: string
}

export default function Xlink({
  $theme = 'light',
  $isFullLink,
  altClassName = '',
  ...props
}: StyledLinkProps) {

  const location = useLocation();
  // use pile existante ou crée une vide
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
        `${xLinkRecipe({
          theme: $theme,
          isFullLink: $isFullLink,
          isActive,
        })} ${altClassName}`.trim()
      }
    >
      {props.children}
    </NavLink>
  )
}
