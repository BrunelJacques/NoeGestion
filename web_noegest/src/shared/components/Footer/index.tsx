// Footer.tsx
import { useTheme } from '../../hooks/index.tsx'

import * as styles from './index.css'


function Footer() {
  const { toggleTheme, theme } = useTheme()

  return (
    <footer className={styles.footer}>

      <button
        className={styles.nightModeButton}
        onClick={toggleTheme}
      >
        Changer l'affichage : {theme === 'light' ? '☀️' : '🌙'}
      </button>
    </footer>
  )
}

export default Footer
