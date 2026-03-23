import type { ReactNode } from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import { AuthContext } from "../contexts/AuthContext";
import type { Tokens, LoginResponse, User } from "../contexts/AuthContext";
import { apiUrl } from "../constants/api.Constants";

import { api, setAuthTokens, setRefreshHandler, setLogoutHandler } from "../services/api"; 

export const AuthProvider = ({ children }: { children: ReactNode }) => {


  // --- STATE INIT ---
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const stored = localStorage.getItem("tokens");
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);

  const tokensRef = useRef<Tokens | null>(tokens);

  // --- CENTRALIZED STORAGE ---
  const saveAuth = useCallback((newTokens: Tokens | null, newUser: User | null) => {
    if (newTokens) {
      localStorage.setItem("tokens", JSON.stringify(newTokens));
    } else {
      localStorage.removeItem("tokens");
    }

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }

    setTokens(newTokens);
    setUser(newUser);
  }, []);

    // --- LOGOUT ---
  const logout = useCallback(() => {
    saveAuth(null, null);
  }, [saveAuth]);

  const logoutRef = useRef(logout);

  // --- REFRESH TOKEN ---
  const refreshToken = useCallback(async (): Promise<string | null> => {
    const currentTokens = tokensRef.current;

    if (!currentTokens?.refresh) return null;

    try {
      const res = await axios.post<{ access: string }>(
        apiUrl.TOKENREFRESH_URL,
        { refresh: currentTokens.refresh }
      );

      const newTokens = {
        access: res.data.access,
        refresh: currentTokens.refresh,
      };

      setTokens(newTokens);
      localStorage.setItem("tokens", JSON.stringify(newTokens));

      return res.data.access;
    } catch (err) {
      console.error("Refresh failed", err);
  
      logoutRef.current();
      return null;
    }
  }, []);


  // --- LOAD USER ---
  const loadUser = useCallback(async () => {
    try {
      const res = await api.get<User>(apiUrl.ME_URL);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user", err);
      logoutRef.current();
    } finally {
      setLoading(false);
    }
  }, []);


  // --- INIT LOAD ---

  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  useEffect(() => {
    if (!tokens) {
      setLoading(false);
      return;
    }

    loadUser();
  }, [tokens, loadUser]);


  useEffect(() => {
    setAuthTokens(tokens?.access || null);
  }, [tokens]);

  useEffect(() => {
    setRefreshHandler(refreshToken);
    setLogoutHandler(logout);
  }, [refreshToken, logout]);

  // init
  useEffect(() => {
    if (!tokens) {
      setLoading(false);
      return;
    }

    loadUser();
  }, [tokens, loadUser]);


  // --- LOGIN ---
  const login = async (username: string, password: string) => {
    try {
      const res = await api.post<LoginResponse>(
          apiUrl.TOKEN_URL,
          { username, password }
      );

      const newTokens = {
        access: res.data.access,
        refresh: res.data.refresh,
      };

      const newUser: User = {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        groups: res.data.groups,
        isStaff: res.data.isStaff,
        isActive: res.data.isActive,
      };

      saveAuth(newTokens, newUser);

      return { success: true };
    } catch (err) {
      console.error("Login failed", err);
      return { success: false };
    }
  };
  // --- CONTEXT VALUE ---
  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        login,
        logout,
        loading,
        isAuthenticated: !!tokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;