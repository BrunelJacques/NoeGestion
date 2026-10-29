// src/ap_stocks/hooks/contextMouvement/MouvementProvider.tsx
import {useMemo, useState, type ReactNode } from "react";
import type { Mouvement } from "../../types/mouvement";
import { MouvementContext, MvtPatchContext } from "./MouvementContext";


export const MouvementProvider = ({ children, initialMouvement }: { children: ReactNode; initialMouvement: Mouvement }) => {

  const [mouvement, setMouvement] = useState<Mouvement>(initialMouvement);
  const [mvtPatch, setMvtPatch] = useState<Mouvement>(mouvement);
  const [formKey, setFormKey] = useState(0);

  const resetPatch = () => {
    setMvtPatch(mouvement);
    setFormKey((prevKey) => prevKey + 1);
  }

  // Mémoïsation pour éviter les re-renders inutiles
  const mvtValue = useMemo(() => ({
    mouvement,
    setMouvement,
    resetPatch
  }), [mouvement]);

  const mvtPatchValue = useMemo(() => ({
    mvtPatch,
    setMvtPatch,
    resetPatch,
    formKey
  }), [mvtPatch, formKey]);

  return (
    <MouvementContext.Provider value={mvtValue}>
      <MvtPatchContext.Provider value={mvtPatchValue}>
        {children}
      </MvtPatchContext.Provider>
    </MouvementContext.Provider>
  );
};