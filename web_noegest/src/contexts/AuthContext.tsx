import { createContext } from "react";

export interface Tokens {
  access: string;
  refresh: string;

}

// What your backend returns on login
export interface LoginResponse extends Tokens {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  groups: string[];
  isStaff: boolean;
  isActive: boolean;
}

// What you store as the authenticated user
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  groups: string[];
  isStaff: boolean;
  isActive: boolean;
}

export interface JwtPayload {
  user_id?: number;
  username?: string;
  exp?: number;
  [key: string]: unknown;
}

export interface AuthContextType {
  user: User | null;
  tokens: Tokens | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
