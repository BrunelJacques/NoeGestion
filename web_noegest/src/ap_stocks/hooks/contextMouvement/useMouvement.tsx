//src/ap_stocks/hooks/contextMouvement/useMouvement.tsx
import { useContext } from "react";
import { MouvementContext, MvtPatchContext } from "./MouvementContext";

export function useMouvement() {
  const context = useContext(MouvementContext);

  if (!context) {
    throw new Error(
      "useMouvement doit être utilisé dans un MouvementProvider"
    );
  }
  return context;
}

export function useMvtPatch() {
  const context = useContext(MvtPatchContext);

  if (!context) {
    throw new Error(
      "useMvtPatch doit être utilisé dans un MouvementProvider"
    );
  }
  return context;
}