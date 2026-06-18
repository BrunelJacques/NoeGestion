// src/ui/Xlink.tsx
import { NavLink } from 'react-router-dom'
import { xLinkRecipe } from './index.css'
import {useNavState} from "../../hooks/navState.tsx";


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

  const { navState } = useNavState()

  return (
    <NavLink
      to={props.to}
      state={{ pageStack: navState }} // On passe la pile mise à jour à la prochaine page
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
