import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import Galery from './pages/Galery'
import HelloWorld from './pages/HelloWorld'
import Error from './components/Error'  


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 🌍 PUBLIC
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },

      { path: '/error', element: <Error /> },


      // 🔐 PROTECTED
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/hello', element: <HelloWorld /> },
          { path: '/galery', element: <Galery /> },
          { path: '/logout', element: <LogoutPage /> },
        ],
      },
    ],
  },
])