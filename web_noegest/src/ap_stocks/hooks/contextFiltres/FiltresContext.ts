//src/ap_stocks/hooks/contextFiltres/FiltresContext.ts
import { createContext } from "react";
import type { MvtFiltres } from "../../types/mvtFiltres";

export interface FiltresContextType {
  filtres: MvtFiltres;
  setFiltres: (
    value: MvtFiltres | ((prev: MvtFiltres) => MvtFiltres)
  ) => void;
}

export const FiltresContext =
  createContext<FiltresContextType | null>(null);
  