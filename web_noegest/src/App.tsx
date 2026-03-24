
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeContext } from "./contexts/ThemeContext";
import { useTheme } from "./hooks/useTheme";



function App() {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
     </ThemeContext.Provider>
  )
}
 


export default App