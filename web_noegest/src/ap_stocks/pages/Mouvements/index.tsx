//src/ap_stocks/components/Mouvements/index.tsx
import React from "react";
import * as s from "./index.css";

export default function FiltreMvt() {
  // Simulation de données
  const colonnes = Array.from({ length: 10 }, (_, i) => `Col ${i + 1}`);
  const lignes = Array.from({ length: 49 }, (_, i) => `Ligne ${i + 1}`);

return (

    <section className={s.tableauWrapper}>

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

