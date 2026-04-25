// src/ap_stocks/hooks_provid/useFiltres.tsx
import { createContext, useContext } from "react";


export const StFiltresContext = createContext({
  typeMvt: '',
  setTypeMvt: (typeMvt: string) => {},    

});