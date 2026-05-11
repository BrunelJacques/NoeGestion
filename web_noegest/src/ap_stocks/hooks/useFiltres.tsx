// src/ap_stocks/hooks/useFiltres.tsx

import { useState, useEffect } from "react";
import { FILTRES0 } from "../types/params";
import type { TypFiltreMvts } from "../types/params";

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

// Ce hook draft crée simplement un état local pour manipuler 

export function useDraftFiltresStocks(initialValues: TypFiltreMvts) {
  const [draft, setDraft] = useState<TypFiltreMvts>(initialValues);
  
  // Fonction utilitaire pour mettre à jour un seul champ facilement
  const updateField = (field: keyof TypFiltreMvts, value: TypFiltreMvts[keyof TypFiltreMvts]) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  return { draft, setDraft, updateField };
}