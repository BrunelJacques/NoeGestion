import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/index.tsx'

import Logo from '../../../assets/logo.png'
import * as styles from './header.css'
import { StyledLink } from '../../styles/StyledLink/index.tsx'




function Header() {
  const { theme } = useTheme()

  return (
    <nav className={styles.navContainer}>
      <Link to="/">
        <img title="Logo" className={styles.homeLogo} src={Logo} />
      </Link>

      <div className={styles.linksWrapper}>
        <StyledLink $theme={theme} to="/">
          Accueil
        </StyledLink>

        <StyledLink $theme={theme} to="/galery">
          Galery
        </StyledLink>

        <StyledLink to="/logout" $isFullLink>
          Logout
        </StyledLink>
      </div>
    </nav>
  )
}

export default Header
