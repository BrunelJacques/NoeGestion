// src/ap_stocks/pages/Mouvements/index.tsx
import React, { useEffect, useState } from "react";
import * as s from "../Mouvements/index.css";
import { dicCalculs } from "../../utils/calculs.tsx";
import { SpanCell } from "../../../ui/SpanCell";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import type { Mouvement, MvtsRetour } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields } from "../../constants/lstMvtFields";
import { useNavigate } from "react-router-dom";
import { getCellValue } from "../../../utils/getCellValue";
import {useNavState} from "../../../hooks/navState.tsx";

function Mouvements() {

  const { setError } = useError();
  const { filtres } = useFiltres();
  const [mouvements, setMouvements] = useState<Mouvement[]>([]);

  // Utilisation native de URLSearchParams
  const queryParams = new URLSearchParams();
  if (filtres?.jour) {
    // Option 'sv-SE' force le format YYYY-MM-DD en utilisant l'heure locale
    const localDateStr = filtres.jour.toLocaleDateString("sv-SE");
    queryParams.append("jour", localDateStr);
  }
  if (filtres?.origine) queryParams.append("origine", filtres.origine);

  const url = `${apiUrl.STMOUVEMENT_URL}?${queryParams.toString()}`;
  const formFields = lstMvtFields[filtres?.pageOrigine || "sorties"];
  const colonnes = formFields.filter((field) => !field.noLstDisplay);

  const gridColumns = colonnes
    .map((f) => `minmax(${f.width ?? 50}px, 1fr)`)
    .join(" ");

  useEffect(() => {
    let isMounted = true;
    const executeFetch = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError("Échec api mouvements: no response.");
        }
        const mvts: MvtsRetour = await response.json();

        if (isMounted) setMouvements(mvts.results);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
        if (isMounted) {
          setError(["Échec d'appel à l'API des mouvements.", error instanceof Error ? error.message : String(error)].filter(Boolean).join(" - "));
        }
      }
    };
    executeFetch().then(() => {});
    return () => { isMounted = false; };
  }, [url, filtres, setError]);

  const navigate = useNavigate();
  const { getNavState } = useNavState(); // On récupère la fonction de génération

  const handleCellClick = (mvtId: Mouvement["id"]) => {
    navigate(`/stocks/one-mvt/${mvtId}`, {
      state: {
        // On génère la pile exacte au moment précis du clic
        pageStack: getNavState("Liste Mvts")
      }
    });
  };

  return (
    <section className={s.tableauWrapper}>
      <div className={s.grid} style={{ gridTemplateColumns: gridColumns }}>

        {/* Entêtes */}
        {colonnes.map((col) => (
          <div key={`head-${col.label}`} className={s.columnHeader}>
            {col.label}
          </div>
        ))}

        {/* Données */}
        {mouvements.map((mvt) => (
          // Le Fragment avec sa clé est obligatoire ici pour le CSS Grid !
          <React.Fragment key={mvt.id}>
            {colonnes.map((col) => {
              const val = getCellValue(mvt, col, dicCalculs);
              return (
                <div
                  key={`cell-${mvt.id}-${col.label}`}
                  className={s.dataCell}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCellClick(mvt.id)}
                  onKeyDown={(evt) => {
                    if (evt.key === "Enter" || evt.key === " ") {
                      handleCellClick(mvt.id);
                    }
                  }}
                >
                  {typeof val === "number" ? (
                    <SpanCell
                      value={val}
                      justify={col.justify}
                      nbDecimals={col.nbDecimals}
                      width={col.width}
                    />
                  ) : (
                    <SpanCell
                      value={String(val)}
                      justify={col.justify}
                      width={col.width}
                    />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default Mouvements;