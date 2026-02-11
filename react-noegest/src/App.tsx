import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

