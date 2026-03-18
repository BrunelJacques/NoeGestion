import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./app/HomePage.tsx";
import Error from "./shared/components/Error/index.tsx";
import LoginPage from "./auth/pages/LoginPage.tsx";
import { AuthProvider } from "./auth/context/AuthProvider.tsx";
import Galery from "./shared/pages/Galery/index.tsx";
import PrivateRoute from "./auth/context/PrivateRoute.tsx";
import App from "./app/App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/galery" element={<Galery />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
            } />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
