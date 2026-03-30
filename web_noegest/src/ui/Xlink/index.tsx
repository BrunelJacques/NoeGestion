// src/ui/Xlink.tsx

import { Link } from 'react-router-dom'
import { linkRecipe } from './index.css'

type StyledLinkProps = {
  to: string
  children: React.ReactNode
  $theme?: 'light' | 'dark'
  $isFullLink?: boolean
}

export function Xlink({
  to,
  children,
  $theme = 'light',
  $isFullLink,
}: StyledLinkProps) {
  return (
    <Link
      to={to}
      className={linkRecipe({
        theme: $theme,
        isFullLink: $isFullLink,
      })}
    >
      {children}
    </Link>
  )
}

export default Xlink