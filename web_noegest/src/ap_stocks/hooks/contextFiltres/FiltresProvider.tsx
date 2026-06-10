import { useCallback, useEffect, useState } from "react";
import type { MvtFiltres } from "../../types/mvtFiltres";
import { FiltresContext } from "./FiltresContext";
import { FILTRES0 } from "../../types/mvtFiltres";
import { dateToISO, stringToDate } from "../../../utils/dates";


const STORAGE_KEY = "stocks-filtres";

// Fonction utilitaire pour charger et valider les données proprement
const getSavedFiltres = (): MvtFiltres => {
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



export function FiltresProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filtres, setFiltres] = useState<MvtFiltres>(getSavedFiltres);

  // Sauvegarde automatique avec mise à jour de la date de modification
  const updateFiltres = useCallback((newValue: MvtFiltres | ((prev: MvtFiltres) => MvtFiltres)) => {
    setFiltres((prev) => {
      const nextState = typeof newValue === "function" ? newValue(prev) : newValue;

      // On injecte automatiquement la date du jour de la modification
      //const updatedState = { ...nextState, dateModif: new Date() };

      // On prépare une copie pour le localStorage
      const dataToStore = {
        ...nextState,
        jour: dateToISO(nextState.jour), // jour stocké en YYYY-MM-DD
        dateModif: new Date() //dateTime du jour en dateModif au format UTC internationale par string ISO 8601 (ex: "2026-05-18T10:30:00.000Z")
        };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      return nextState; 
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

  
  return (
    <FiltresContext.Provider
      value={{
        filtres,
        setFiltres: updateFiltres,
      }}
    >
      {children}
    </FiltresContext.Provider>
  );
}