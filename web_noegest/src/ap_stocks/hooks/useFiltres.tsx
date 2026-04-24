// src/ap_stocks/hooks/useFiltres.tsx

import { useState, useEffect } from "react";
import { FILTRES0, TypFiltreMvts } from "../types/params";

const STORAGE_KEY = "stocks-filtres";

function today() {
  return new Date().toISOString().slice(0, 11); // "YYYY-MM-DD"
}

export function useFiltresStocks(defaults: TypFiltreMvts = FILTRES0) {
  const [filtres, setFiltres] = useState<TypFiltreMvts>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaults, jour: today() };
    }

    const parsed = JSON.parse(saved);

    // Si la date stockée n'est pas celle du jour → reset complet
    if (parsed.jour !== today()) {
      return { ...FILTRES0, jour: today() };
    }

    return parsed;
  });

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtres));
  }, [filtres]);

  return { filtres, setFiltres };
}
