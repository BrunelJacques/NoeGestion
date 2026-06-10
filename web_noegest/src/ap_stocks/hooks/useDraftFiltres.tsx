// src/ap_stocks/hooks/useDraftFiltres.tsx

import { useState, useCallback, useMemo } from "react";
import type { MvtFiltres } from "../types/mvtFiltres";


// Ce hook crée le brouillon des modifs de filtres, un état avant validation
export function useDraftFiltres(initialValues: MvtFiltres) {
  const [draft, setDraft] = useState<MvtFiltres>(initialValues);

  // Fonction utilitaire pour mettre à jour un seul champ facilement
  const updateField = useCallback(
    (field: keyof MvtFiltres, value: MvtFiltres[keyof MvtFiltres] 
    ) => {
      setDraft(prev => ({ ...prev, [field]: value }));
      console.log(`setDraft ${field} value:`,value)
    },
    []
  );
  
  // On mémoïse pour qu'il ne renderise que si changement de valeurs ou fonction
  return useMemo(() => ({ 
    draft, 
    setDraft, 
    updateField 
  }), [draft, updateField]);
}