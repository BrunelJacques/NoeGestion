import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthContext missing. Make sure to wrap your app in <AuthProvider>.");
  }
  return ctx;
};

export default { useAuth };