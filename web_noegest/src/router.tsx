// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Galery from './pages/Galery'
import Hello from './pages/Hello'
import Error404 from './pages/Error404'
import Register from './pages/Register'
import StFiltres from './stocks/pages/Filtres'
import StMouvements from './stocks/pages/Mouvements'
import StOneMvt from './stocks/pages/OneMvt'
import StLayout from './stocks/StLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      
      // PUBLIC
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/hello', element: <Hello /> },

      // PROTECTED
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/galery', element: <Galery /> },
          { path: '/logout', element: <Logout />},

          // --- DOMAINE STOCKS ---
          {
            path: '/stocks',
            element: <StLayout />,   // <== providers métier ici
            children: [
              { path: 'filtres', element: <StFiltres /> },
              { path: 'mouvements', element: <StMouvements /> },
              { path: 'one-mvt/:id', element: <StOneMvt /> },
            ],
          },
        ],
      },
      { path: '*', element: <Error404 /> },
    ],
  },
])