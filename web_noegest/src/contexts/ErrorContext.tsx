// src/context/ErrorContext.tsx
import { createContext, useContext, useState } from "react";

type ErrorContextType = {
  error: string | null;
  setError: (msg: string) => void;
  clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setErrorState] = useState<string | null>(null);

  const setError = (msg: string) => setErrorState(msg);
  const clearError = () => setErrorState(null);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used inside <ErrorProvider>");
  return ctx;
}
