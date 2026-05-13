// src/ap_stocks/hooks/useFiltres.tsx

import { useState, useEffect, useCallback } from "react";
import { FILTRES0 } from "../types/params";
import type { TypFiltreMvts } from "../types/params";

const STORAGE_KEY = "stocks-filtres";

function today() {
  return new Date().toISOString().slice(0, 11); // "YYYY-MM-DD"
}


export function useFiltres(defaults: TypFiltreMvts = FILTRES0) {

  const [filtres, setFiltres] = useState<TypFiltreMvts>(() => {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaults, jour: today() };
    }

    const parsed = JSON.parse(saved);
    console.log("useFiltres.parsed",parsed)

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
export function useDraftFiltres(initialValues: TypFiltreMvts) {
  const [draft, setDraft] = useState<TypFiltreMvts>(initialValues);
  // Fonction utilitaire pour mettre à jour un seul champ facilement
  const updateField = useCallback((field: keyof TypFiltreMvts, value: TypFiltreMvts[keyof TypFiltreMvts]) => {
    setDraft(prev => ({ ...prev, [field]: value }));
    if (field == "pageOrigine"){
      console.log("ok pour Origines")
    }
  },[]);

  return { draft, setDraft, updateField };
}