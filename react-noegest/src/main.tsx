import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage.tsx";
//import HomePage from "./pages/HomePage.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
