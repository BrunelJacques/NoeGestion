
import { Outlet } from 'react-router-dom'
import Header from '../Header/index.tsx'
import useTheme from '../../hooks/useTheme.tsx'


export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
