import { useState,useEffect,useMemo,} from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import type { Tokens, JwtPayload } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const stored = localStorage.getItem("tokens");
    return stored ? JSON.parse(stored) : null;
  });

  const user = useMemo(() => {
    if (!tokens) return null;
    return jwtDecode<JwtPayload>(tokens.access);
  }, [tokens]);

  useEffect(() => {
    if (tokens) {
      localStorage.setItem("tokens", JSON.stringify(tokens));
    } else {
      localStorage.removeItem("tokens");
    }
  }, [tokens]);

  const login = async (username: string, password: string) => {
    const res = await axios.post<Tokens>(
      "http://localhost:8000/api/token/",
      { username, password }
    );
    setTokens(res.data);
  };

  const logout = () => {
    setTokens(null);
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
