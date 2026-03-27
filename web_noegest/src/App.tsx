
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>                
          <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App