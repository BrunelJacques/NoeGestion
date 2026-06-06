//src/ap_stocks/components/Mouvements/index.tsx
import React, { useEffect, useState } from "react";
import * as s from "./index.css";
import { DisplayValue } from "../../../ui/DisplayValue";
import { useFiltres } from "../../hooks/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import type { Mouvement, MvtsRetour } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields, type FormField } from "../../types/formFields";

export default function Mouvements() {
  
  const { setError } = useError();
  const { filtres } = useFiltres();
  const [mouvements, setMouvements] = useState<Mouvement[]>([]);

  const urlParams = () => {
    if (!filtres) return "";
    const jourStr = `jour=${filtres.jour.toISOString().split('T')[0]}`; // Format YYYY-MM-DD
    const origine = filtres.origine ? `origine=${filtres.origine}` : "";
    const params = [jourStr, origine].filter(Boolean).join('&');
    return `?${params}`;
  }

  const url = apiUrl.STMOUVEMENT_URL + urlParams();

  const formFields = lstMvtFields[filtres?.pageOrigine || "sorties"]; // Champs correspondant à pageOrigine sélectionnée

  useEffect(() => {
    // On crée une variable pour éviter de mettre à jour l'état si le composant est démonté
    let isMounted = true;

    const executeFetch = async () => {
      try {
        const response = await fetch(url);
        const mvts: MvtsRetour = await response.json();
        
        // On ne met à jour l'état que si le composant est toujours actif
        if (isMounted) {
          setMouvements(mvts.results);
        }
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
        if (isMounted) {       
          setError( // affichage de l'erreur à l'écran
            [
              "Échec d'appel à l'API des mouvements.",
              error && `Détails : ${error}` || `Erreur inconnue.`
            ]
              .filter(Boolean) // pour éviter les éléments  undefined, null, 0, ""
              .join(" - ")   
          );
        }
      return;
      }
    };

    executeFetch();

    // Fonction de nettoyage (cleanup)
    return () => {
      isMounted = false;
    };
  }, [setError, url]); // L'effet se déclenche dès que l'URL change

  console.log("Mouvements fetched:", url, mouvements.length);

  const colonnes = formFields.filter((field) => !field.noDisplay);
  const gridTemplateColumns = colonnes.map((f) => `${f.width ?? 150}px`).join(' ');

  const getCellValue = (mvt: Mouvement, field: FormField): string | number => {
    if (!field.fieldName) return "";
    if (field.fieldName === "article") return mvt.article.nom;
    if (field.fieldName === "prixunitaire") return mvt.prixunit;
    const val = mvt[field.fieldName as keyof Mouvement];
    if (val == null || typeof val === "object") return "";
    return val as string | number;
  };

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

      <div className={s.table} style={{ gridTemplateColumns }}>
        {/* Entêtes colonnes : Sticky au scroll vertical */}
        <div className={s.headerRow}>
          {colonnes.map((col) => (
            <div key={col.label} className={s.columnHeader}>
              {col.label}
            </div>
          ))}
        </div>

        {/* Données */}
        {mouvements.map((mvt) => (
          <React.Fragment key={mvt.id}>
            {colonnes.map((col) => {
              const val = getCellValue(mvt, col);
              return (
                <div key={col.label} className={s.dataCell}>
                  {typeof val === "number"
                    ? <DisplayValue value={val} justify={col.justify} nbDecimals={col.nbDecimals} />
                    : <DisplayValue value={val} justify={col.justify} />
                  }
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

