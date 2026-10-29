//src/ap_stocks/hooks/contextMouvement/MouvementContext.ts
import { createContext } from "react";
import type { Key } from "react";
import type { Mouvement } from "../../types/mouvement.ts";

interface MouvementContextType {
  mouvement: Mouvement;
  setMouvement: React.Dispatch<React.SetStateAction<Mouvement>>;
}

export const MouvementContext =
  createContext<MouvementContextType | undefined>(undefined);

interface PatchContextType {
  mvtPatch: Mouvement;
  setMvtPatch: React.Dispatch<React.SetStateAction<Mouvement>>;
  resetPatch: () => void;
  formKey: Key;
}

export const MvtPatchContext =
  createContext<PatchContextType | undefined>(undefined);
