
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { ErrorProvider } from './contexts/ErrorContext'


function App() {
  return (
    <ErrorProvider> 
      <ThemeProvider>
        <AuthProvider>                
            <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ErrorProvider> 
  )
}

export default App