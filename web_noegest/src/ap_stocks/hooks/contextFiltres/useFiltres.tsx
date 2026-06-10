//src/ap_stocks/hooks/contextFiltres/useFiltres.tsx
import { useContext } from "react";
import { FiltresContext } from "./FiltresContext";

export function useFiltres() {
  const context = useContext(FiltresContext);

  if (!context) {
    throw new Error(
      "useFiltres doit être utilisé dans un FiltresProvider"
    );
  }

  return context;
}