import { createContext } from "react";

export interface Tokens {
  access: string;
  refresh: string;
}

export interface JwtPayload {
  user_id?: number;
  username?: string;
  exp?: number;
  [key: string]: unknown;
}

export interface AuthContextType {
  user: JwtPayload | null;
  tokens: Tokens | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
