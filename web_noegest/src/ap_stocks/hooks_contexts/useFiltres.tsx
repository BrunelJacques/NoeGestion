// src/ap_stocks/hooks_provid/useFiltres.tsx
import { createContext } from "react";


export const zzStFiltresContext = createContext({
  typeMvt: '',
  setTypeMvt: (x: string) => x,
});