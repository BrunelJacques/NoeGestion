//src/hooks/useUrl.tsx
import { useLocation } from "react-router-dom";

export function useUrl() {
  const { pathname, search, hash } = useLocation();

  const segments = pathname.split("/").filter(Boolean);
  const query = new URLSearchParams(search);

  return {
    pathname,
    search,
    hash,
    segments,
    query,
  };
}

