//Layout/index.tsx

import { Outlet } from 'react-router-dom'
import Header from '../Header/index.tsx'
import Footer from '../Footer/index.tsx'
import { useTheme } from '../../hooks/useTheme.tsx'
import { lightTheme, darkTheme } from '../../assets/styles/themes.css';
import * as s from './index.css.ts'
import ErrorBanner from '../../components/ErrorBanner/index.tsx';


export default function Layout() {
  const { theme } = useTheme();
  // On sélectionne la classe de thème générée par Vanilla-Extract
  const themeClass = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div className={ `${themeClass} ${s.appLayout}` } >
      <div className={s.scrollArea}>
        <Header />
        <ErrorBanner />
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
