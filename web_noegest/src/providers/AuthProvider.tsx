import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import type { Tokens, LoginResponse, User } from "../contexts/AuthContext";
import { apiUrl } from "../constants/api.Constants";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const stored = localStorage.getItem("tokens");
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);

  // Decode JWT (optional — only if you want exp, user_id, etc.)
  /* 
  const jwtPayload = useMemo(() => {
    if (!tokens) return null;
    return jwtDecode(tokens.access);
  }, [tokens]); */

  // Persist tokens + user
  useEffect(() => {
    if (tokens) localStorage.setItem("tokens", JSON.stringify(tokens));
    else localStorage.removeItem("tokens");
  }, [tokens]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Auto-load user on refresh if tokens exist
  useEffect(() => {
    const loadUser = async () => {
      if (!tokens || user) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get<User>(apiUrl.TOKENREFRESH_URL, {
          headers: { Authorization: `Bearer ${tokens.access}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user", err);
        setTokens(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  // Login
  const login = async (username: string, password: string) => {
    console.log("apiUrl.TOKEN_URL: ", apiUrl.TOKEN_URL) 
    const res = await axios.post<LoginResponse>(
      apiUrl.TOKEN_URL
      ,
      { username, password }
    );

    // Store tokens
    setTokens({
      access: res.data.access,
      refresh: res.data.refresh,
    });

    // Store user profile
    setUser({
      id: res.data.id,
      username: res.data.username,
      email: res.data.email,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      groups: res.data.groups,
      isStaff: res.data.isStaff,
      isActive: res.data.isActive,
    });
  };

  // Logout
  const logout = () => {
    setTokens(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;