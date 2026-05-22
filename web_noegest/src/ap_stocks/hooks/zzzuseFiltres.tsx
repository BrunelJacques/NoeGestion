// src/ap_stocks/hooks/useFiltres.tsx => 21-05-2026

import { useState, useEffect, useMemo } from "react";
import { FILTRES0 } from "../types/params";
import type { TypFiltreMvts } from "../types/params";
import { stringToDate } from "../../utils/dates";

const STORAGE_KEY = "stocks-filtres";


export function useFiltres() {

  const [filtres, setFiltres] = useState<TypFiltreMvts>(() => {

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return { ...FILTRES0, jour: new Date() };
    }

    const data = JSON.parse(saved);

    data.jour = stringToDate(data.jour)
    data.dateModif = stringToDate(data.dateModif)
    const aujourdhui = new Date();

    if (!data.jour || !data.dateModif) {
      return { ...FILTRES0, jour: new Date() };
    }
    // Si la date de modif de la dernière sauvegarde est ancienne, on reset les filtres
    if (data.dateModif.toISOString().slice(0, 10) != aujourdhui.toISOString().slice(0, 10)) {
      return { ...FILTRES0, jour: new Date() };
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
