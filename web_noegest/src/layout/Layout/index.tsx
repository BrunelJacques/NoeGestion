
import { Outlet } from 'react-router-dom'
import Header from '../Header/index.tsx'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
