import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/styles/global.css.ts'

import { AuthProvider } from "./providers/AuthProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

import App from "./App.tsx";
import Header from "./layout/Header/index.tsx";

import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";
import Galery from "./pages/Galery/index.tsx";
import HelloWorld from "./pages/HelloWorld/index.tsx";
import Error from "./components/Error/index.tsx";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>   
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/galery" element={<Galery />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/hello" element={<HelloWorld />} />
            <Route path="/" element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
              } />
            <Route path="*" element={<Error />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
