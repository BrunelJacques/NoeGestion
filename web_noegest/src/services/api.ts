import axios from "axios";
import { apiUrl } from "../constants/api.Constants";

export const api = axios.create({
  baseURL: apiUrl.BASE,
});

// --- STATE INTERNE (injecté depuis AuthProvider) ---
let accessToken: string | null = null;
let refreshTokenFn: (() => Promise<string | null>) | null = null;
let logoutFn: (() => void) | null = null;

// --- SETTERS appelés par AuthProvider ---
export const setAuthTokens = (token: string | null) => {
  accessToken = token;
};

export const setRefreshHandler = (fn: () => Promise<string | null>) => {
  refreshTokenFn = fn;
};

export const setLogoutHandler = (fn: () => void) => {
  logoutFn = fn;
};

// --- REQUEST INTERCEPTOR ---
/* api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
 */
// Garde ton instance mais assure-toi que l'intercepteur est direct
api.interceptors.request.use((config) => {
  // On récupère le token depuis le localStorage SI la variable locale est vide
  // Cela évite les problèmes de désynchronisation au rafraîchissement de la page
  const token = accessToken || JSON.parse(localStorage.getItem("tokens") || "{}")?.access;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// --- RESPONSE INTERCEPTOR ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // éviter boucle infinie
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshTokenFn) {
        const newAccess = await refreshTokenFn();

        if (newAccess) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest); // 🔥 retry
        }
      }

      // refresh failed → logout
      if (logoutFn) logoutFn();
    }

    return Promise.reject(error);
  }
);