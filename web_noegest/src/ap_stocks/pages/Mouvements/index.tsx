//src/ap_stocks/components/Mouvements/index.tsx
import React, { useCallback, useEffect, useState } from "react";
import * as s from "./index.css";
import { DisplayValue } from "../../../ui/DisplayValue";
import { useFiltres } from "../../hooks/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import type { MvtsRetour } from "../../types/mouvement";

export default function Mouvements() {
  
  const { filtres } = useFiltres();
  const [mouvements, setMouvements] = useState<MvtsRetour>({count: 0, results: []});

  const urlParams = () => {
    if (!filtres) return "";
    const jourStr = `jour=${filtres.jour.toISOString().split('T')[0]}`; // Format YYYY-MM-DD
    const origine = filtres.origine ? `origine=${filtres.origine}` : "";
    const params = [jourStr, origine].filter(Boolean).join('&');
    return `?${params}`;
  }

  const url = apiUrl.STMOUVEMENT_URL + urlParams();

  const fetchMouvements = useCallback(async () => {
    try {
      const response = await fetch(url);
      const mvts: MvtsRetour = await response.json();
      setMouvements(mvts);
    } catch (error) {
      console.error("Erreur lors du fetch :", error);
    }
  }, [url]); // Ne change que si l'URL change
 
  // Déclenche le fetch quand l'URL change dans fetchMouvements)
  useEffect(() => {
    fetchMouvements();
  }, [fetchMouvements]);

  console.log("Mouvements fetched:", url, mouvements.results.length);


  // Simulation de données
  const colonnes = Array.from({ length: 10 }, (_, i) => `Col ${i + 1}`);
  const lignes = Array.from({ length: 49 }, (_, i) => `Ligne ${i + 1}`);

return (

    <section className={s.tableauWrapper}>
      <div className={s.flexLigne}>
        <DisplayValue
          value="Tableau des Mouvements"
          justify="center"
          width={250}
        />  
        
        <DisplayValue
          value={256.4567}
          nbDecimals={3}
          justify="right"
          width={140}
        />  
      </div>      

      <div className={s.table}>
        {/* Entêtes colonnes : Sticky au scroll vertical */}
        <div className={s.headerRow}>
          {colonnes.map((col) => (
            <div key={col} className={s.columnHeader}>
              {col}
            </div>
          ))}
        </div>

        {/* Données : Scrolled par tableauWrapper */}
        {lignes.map((ligne) => (
          <React.Fragment key={ligne}>
            {colonnes.map((col) => (
              <div key={`${ligne}-${col}`} className={s.dataCell}>
                {ligne}, {col}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

