import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import ProtectedRoute from './components/PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'stocks',
        element: (
          <ProtectedRoute>
            <div>Stocks page</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'home',
        element: <div>Home</div>,
      },
    ],
  },
])