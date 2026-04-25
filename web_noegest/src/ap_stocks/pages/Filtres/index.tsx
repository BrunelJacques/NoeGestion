//src/ap_stocks/components/FiltreMvt/index.tsx
import React from "react";
import { useFiltresStocks } from "../../hooks/useFiltres";
import { FILTRES0 } from "../../types/params";
import * as s from "./index.css";

export default function Filtres() {
  // Simulation de données
  const colonnes = Array.from({ length: 10 }, (_, i) => `Col ${i + 1}`);
  const lignes = Array.from({ length: 50 }, (_, i) => `Ligne ${i + 1}`);

  const { filtres, setFiltres } = useFiltresStocks(FILTRES0);  
  function resetFiltres() {   
    const filtres0 = FILTRES0;
    setFiltres(filtres0);
  }

return (

    <section className={s.tableauWrapper}>

      <div>Filtres lus: {JSON.stringify(filtres)}</div>
      <div className={s.debug}>
        {Object.entries(filtres).map(([id, valeur]) => (
          <div key={id} className={s.ligne}>
            <strong>{id}</strong> : {String(valeur)}
          </div>
        ))}
      </div>
      <div>Jour date: {JSON.stringify(filtres.jour).slice(0, 11)}</div>
      <button onClick={() => resetFiltres()}>Reset Filtres</button>


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

