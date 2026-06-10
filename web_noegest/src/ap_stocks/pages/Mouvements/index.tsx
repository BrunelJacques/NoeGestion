//src/ap_stocks/components/Mouvements/index.tsx
import React, { useEffect, useState } from "react";
import * as s from "./index.css";
import { dicCalculs }  from "../Mouvements/calculs"
import { DisplayValue } from "../../../ui/DisplayValue";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import type { Mouvement, MvtsRetour } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import type { MvtFormField } from "../../types/mvtFormFields";
import { lstMvtFields } from "../../constants/lstMvtFields";



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


  // Récupération de la valeur à afficher
  const getCellValue = (mvt: Mouvement, field: MvtFormField): string | number => {
    
  if (field.calcul) {
    
    // On récupère la fonction grâce à sa clé en string
    const fonctionAExecuter = dicCalculs[field.calcul];
    
    if (fonctionAExecuter) {
      return fonctionAExecuter(mvt); // On l'appelle ici
    } else {
      console.error(`La fonction ${field.calcul} n'existe pas.`);
      return "";
    }
  }

    if (!field.fieldName) return field.default?.toString() || "mvt.pbParam"; 

    if (field.fieldName === "article" && field.subFieldName) { // appel avec clé externe ex: article.nom_court
      const subKey = field.subFieldName
      const article = mvt.article
      return article && subKey in article ? (article[subKey] ?? "mvt.pbParam2") : "";
    } 

    const val = mvt[field.fieldName]; // cas d'un champ direct ds mouvement
    if (val == null || typeof val === "object") { 
      return "mvt.pbParam3"
    };
    return val;
  };


  return ( // grille liste des mouvements

    <section className={s.tableauWrapper}>

      <div className={s.grid} style={{ gridTemplateColumns }}>
        {/* Entêtes colonnes */}
        {colonnes.map((col) => (
          <div key={`head-${col.label}`} className={s.columnHeader}>
            {col.label}
          </div>
        ))}

        {/* Lignes de Données */}
        {mouvements.map((mvt) => (
          <React.Fragment key={mvt.id}>
            {colonnes.map((col) => {
              const val = getCellValue(mvt, col);
              return (
                <div key={`cell-${mvt.id}-${col.label}`} className={s.dataCell}>
                  {typeof val === "number" ? (
                    <DisplayValue value={val} justify={col.justify} nbDecimals={col.nbDecimals} width={col.width} />
                  ) : (
                    <DisplayValue value={val} justify={col.justify} width={col.width} />
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

