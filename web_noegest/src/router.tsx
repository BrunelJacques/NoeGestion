// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Galery from './pages/Galery'
import HelloWorld from './pages/HelloWorld'
import Error404 from './pages/Error404'
import Register from './pages/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      
      // PUBLIC
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/hello', element: <HelloWorld /> },

      // PROTECTED
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/galery', element: <Galery /> },
          { path: '/logout', element: <Logout />},
        ],
      },
      { path: '*', element: <Error404 /> },
    ],
  },
])