import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Galery from './pages/Galery'
import HelloWorld from './pages/HelloWorld'
import Error from './components/Error'  


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 🌍 PUBLIC
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },

      { path: '*', element: <Error /> },


      // PROTECTED
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/hello', element: <HelloWorld /> },
          { path: '/galery', element: <Galery /> },
          { path: '/logout', element: <Logout />},
        ],
      },
    ],
  },
])