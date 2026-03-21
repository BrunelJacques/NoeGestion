import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/index.tsx'
import { useRef, useEffect, useState } from 'react'

import Logo from '../../../assets/logo.png'

import * as styles from './index.css'

import { StyledLink } from '../../styles/StyledLink/index.tsx'
import { useAuth } from '../../../auth/context/useAuth.tsx'




function Header() {
  const menuRef = useRef<HTMLDivElement | (null)>(null)

  const { theme } = useTheme()
  const [ isOpen, setIsOpen ] = useState(false)  


  // useEffect pour fermer le menu quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) { // "écoute les clics en dehors"
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) //contains() vérifie le lieu du clic
      ) {
        setIsOpen(false) // Ferme le menu si clic en dehors du menu
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      console.log("menuRef: ", menuRef) 

    }
  }, [isOpen])

  const { user } = useAuth();
  const  logLib  = user ? 'Logout' : 'Login';
  
  return (
    <div ref={menuRef} className={styles.header}>
      <Link to="/">
        <img title="Logo" className={styles.logo} src={Logo} />
      </Link>

      <div className={styles.burger}
          onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>

      <nav className={isOpen ? styles.nav.open : styles.nav.closed}>

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
      

    </div>
  )
}

export default Header
