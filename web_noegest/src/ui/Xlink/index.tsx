// src/ui/Xlink.tsx
import { NavLink } from 'react-router-dom'
import { xLinkRecipe } from './index.css'

type StyledLinkProps = {
  to: string
  children?: React.ReactNode
  $theme?: 'light' | 'dark'
  $isFullLink?: boolean
}

export default function Xlink({
  to,
  children,
  $theme = 'light',
  $isFullLink,
}: StyledLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        xLinkRecipe({
          theme: $theme,
          isFullLink: $isFullLink,
          isActive, // 👈 on passe l’état actif à la recette
        })
      }
    >
      {children}
    </NavLink>
  )
}
