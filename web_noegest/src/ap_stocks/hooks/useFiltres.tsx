// src/ap_stocks/hooks/useFiltres.tsx

import { useState, useEffect, useCallback, useMemo } from "react";
import { FILTRES0 } from "../types/params";
import type { TypFiltreMvts } from "../types/params";
import { stringToDate } from "../../utils/dates";

const STORAGE_KEY = "stocks-filtres";

function today() {
  return new Date()
}


export function useFiltres() {

  const [filtres, setFiltres] = useState<TypFiltreMvts>(() => {

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return { ...FILTRES0, jour: today() };
    }

    const data = JSON.parse(saved);

    data.jour = stringToDate(data.jour)
    data.dateModif = stringToDate(data.dateModif)
    const aujourdhui = today();

    if (!data.jour || !data.dateModif) {
      return { ...FILTRES0, jour: today() };
    }
    // Si la date de modif de la dernière sauvegarde est ancienne, on reset les filtres
    if (data.dateModif.toISOString().slice(0, 10) != aujourdhui.toISOString().slice(0, 10)) {
      return { ...FILTRES0, jour: today() };
    }
 
    return data;
  });

  // Sauvegarde automatique en localStorage à chaque changement de filtres
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtres));
  }, [filtres]);

  // Conserve en mémoire le pointeur state, pour éviter les re-renders inutiles
  return useMemo(() => ({ 
    filtres, 
    setFiltres
  }), [filtres]);
}


// Ce hook crée le brouillon des modifs de filtres, un état avant validation
export function useDraftFiltres(initialValues: TypFiltreMvts) {
  const [draft, setDraft] = useState<TypFiltreMvts>(initialValues);

  // Fonction utilitaire pour mettre à jour un seul champ facilement
  const updateField = useCallback(
    (field: keyof TypFiltreMvts, value: TypFiltreMvts[keyof TypFiltreMvts] 
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