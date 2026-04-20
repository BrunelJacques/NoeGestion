// src/ui/Xlink.tsx

import { Link } from 'react-router-dom'
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
    <Link
      to={to}
      className={xLinkRecipe({
        theme: $theme,
        isFullLink: $isFullLink,
      })}
    >
      {children}
    </Link>
  )
}
