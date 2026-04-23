//src/providers/ErrorProvider.tsx

import { useState } from "react";
import { ErrorContext } from "../contexts/ErrorContext";



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

