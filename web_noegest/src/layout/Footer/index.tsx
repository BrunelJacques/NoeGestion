// Footer.tsx
import { useTheme } from '../../hooks/useTheme.tsx'

import * as s from './index.css.ts'


function Footer() {
  const { theme, toggleTheme } = useTheme()

  return (
    <footer className={s.footer}>

      <button
      className={s.toggleAfficheMode}
      onClick={()=>toggleTheme(theme)} // anonymisation pour éviter conflit évènements
      >
        Afficher en mode {theme === 'light' ? 'noir 🌙' : 'clair ☀️'}
      </button>
      
    </footer>
  )
}

export default Footer
