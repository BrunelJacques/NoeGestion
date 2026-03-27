// Layout.tsx

import { Outlet } from 'react-router-dom'
import Header from '../Header/index.tsx'
import Footer from '../Footer/index.tsx'
import { useTheme } from '../../hooks/useTheme.tsx'
import { lightTheme, darkTheme } from '../../assets/styles/themes.css';
import * as s from './index.css.ts'


export default function Layout() {
  const { theme } = useTheme();
  // On sélectionne la classe de thème générée par Vanilla-Extract
  const themeClass = theme === 'light' ? lightTheme : darkTheme;

  // on wrappe toute l'appli avec le thème pour l'activer
  return (
    <div className={ `${themeClass} ${s.layout}` } >
       <Header />
        <main className={`${s.outlet}`}>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}
