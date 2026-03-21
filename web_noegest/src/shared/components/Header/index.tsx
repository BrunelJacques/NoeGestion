
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/index.tsx'

import Logo from '../../../assets/logo.png'
import * as styles from './index.css'
import { StyledLink } from '../../styles/StyledLink/index.tsx'
import { useAuth } from '../../../auth/context/useAuth.tsx'




function Header() {
  const { theme } = useTheme()

  const { user } = useAuth();
  const  logLib  = user ? 'Logout' : 'Login';
  
  return (
    <div className={styles.headerContainer}>
      <Link to="/">
        <img title="Logo" className={styles.logo} src={Logo} />
      </Link>
      <nav className={styles.navContainer}>

        <StyledLink $theme={theme} to="/" $isFullLink>
          Accueil
        </StyledLink>

        <StyledLink $theme={theme} to="/galery" >
          Galery
        </StyledLink>

        <StyledLink to="/logout" $isFullLink>
          {logLib}
        </StyledLink>
      </nav>
      <div className={styles.burger}>☰</div>
    </div>
  )
}

export default Header
