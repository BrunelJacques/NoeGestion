import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.tsx";
import PrivateRoute from "../auth/context/PrivateRoute.tsx";

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

