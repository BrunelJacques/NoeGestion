
import { Outlet } from 'react-router-dom'
import Header from '../Header/index.tsx'
import { AppCard } from '../../components/AppCard'


export default function Layout() {

  return (
    <>
      <Header />
      <AppCard>
        <Outlet />
      </AppCard>
    </>
  )
}
