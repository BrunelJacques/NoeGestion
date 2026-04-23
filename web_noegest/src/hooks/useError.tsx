//src/hooks/useError.tsx
import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";


export function useError() {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used inside <ErrorProvider>");
  return ctx;
}
