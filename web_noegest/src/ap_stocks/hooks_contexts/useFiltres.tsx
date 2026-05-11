// src/ap_stocks/hooks_provid/useFiltres.tsx
import { createContext } from "react";


export const StFiltresContext = createContext({
  typeMvt: '',
  setTypeMvt: (x: string) => {typeMvt = x},    

});