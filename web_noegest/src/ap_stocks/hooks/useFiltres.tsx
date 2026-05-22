// src/ap_stocks/hooks/useFiltres.tsx
import { useState, useEffect, useCallback } from "react";
import { FILTRES0 } from "../types/params";
import type { TypFiltreMvts } from "../types/params";
import { stringToDate } from "../../utils/dates";

const STORAGE_KEY = "stocks-filtres";

// Fonction utilitaire pour charger et valider les données proprement
const getSavedFiltres = (): TypFiltreMvts => {
  if (typeof window === "undefined") return { ...FILTRES0, jour: new Date() };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { ...FILTRES0, jour: new Date() };

    const data = JSON.parse(saved);
    const jour = stringToDate(data.jour);
    const dateModif = stringToDate(data.dateModif);
    const aujourdhui = new Date();

    if (!jour || !dateModif) {
      return { ...FILTRES0, jour: new Date() };
    }

    // Reset si la sauvegarde ne date pas d'aujourd'hui
    if (dateModif.toISOString().slice(0, 10) !== aujourdhui.toISOString().slice(0, 10)) {
      return { ...FILTRES0, jour: new Date() };
    }

    return { ...data, jour, dateModif };
  } catch (error) {
    console.error("Erreur lors de la récupération des filtres :", error);
    return { ...FILTRES0, jour: new Date() };
  }
};

export function useFiltres() {
  const [filtres, setFiltres] = useState<TypFiltreMvts>(getSavedFiltres);

  // Sauvegarde automatique avec mise à jour de la date de modification
  const updateFiltres = useCallback((newValue: TypFiltreMvts | ((prev: TypFiltreMvts) => TypFiltreMvts)) => {
    setFiltres((prev) => {
      const nextState = typeof newValue === "function" ? newValue(prev) : newValue;
      
      // On injecte automatiquement la date du jour de la modification
      const updatedState = { ...nextState, dateModif: new Date() };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      return updatedState;
    });
  }, []);

  // Synchronise les composants si le localStorage change (autre onglet ou autre page l'ayant changé)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFiltres(getSavedFiltres());
      }
    };

    // surveillance du navigateur pour les changements de localStorage
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // On retourne un objet stable. Les composants ne re-renderont que si 'filtres' change visuellement.
  return {
    filtres,
    setFiltres: updateFiltres
  };
}