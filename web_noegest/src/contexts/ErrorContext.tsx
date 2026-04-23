// src/context/ErrorContext.tsx
import { createContext } from "react";

type ErrorContextType = {
  error: string | null;
  setError: (msg: string) => void;
  clearError: () => void;
};

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);
