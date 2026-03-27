// StyledLink.tsx
import { Link } from 'react-router-dom'
import { linkRecipe } from './index.css'

type StyledLinkProps = {
  to: string
  children: React.ReactNode
  $theme?: 'light' | 'dark'
  $isFullLink?: boolean
}

export function StyledLink({
  to,
  children,
  $theme = 'light',
  $isFullLink = false,
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

export default StyledLink