// src/layout/Header/index.tsx
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme.tsx'
import { useRef, useEffect, useState } from 'react'

import Logo from '../../assets/icons/logo.png'
import Home from '../../assets/icons/home2.png'
import profile from '../../assets/icons/profile.png'

import * as s from './index.css.ts'

import Xlink from '../../ui/Xlink/index.tsx'
import { useAuth } from '../../hooks/useAuth.tsx'


export default function Header() {
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

    }
  }, [isOpen])

  const { user } = useAuth();
  const  logLabel  = user ? 'Logout' : 'Login';
  
  return (
    <header ref={menuRef} className={s.header}>
      
      <Link to="/home">
        <img title="Home" className={s.home} src={Home} />
      </Link>

      <Link to="/home">
        <img title="Logo" className={s.logo} src={Logo} />
      </Link>

      <div className={s.burger}
      onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>

      <nav className={isOpen ? s.nav.open : s.nav.closed}>
        <Xlink $theme={theme} to="/stocks/filtres" $isFullLink>
          Stocks
        </Xlink>
        <Xlink $theme={theme} to="/km" $isFullLink> 
          Km
        </Xlink>
        <Xlink $theme={theme} to="/galery" $isFullLink >
          Galery
        </Xlink>
      </nav>
      <div className={s.logout}>
        <Xlink  to="/logout" $isFullLink>
            {logLabel}
            <img title="profile" className={s.profile} src={profile} />
        </Xlink>
      </div>
    </header>
  )
}
