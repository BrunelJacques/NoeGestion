//src/ap_stocks/components/StMenu/AfficheFiltres.tsx
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import type { MvtFiltres } from "../../types/mvtFiltres";
import * as s from "./index.css.ts";


export function AfficheFiltres() { // affichage d'un résumé des filtres actifs dans le menu
  const { filtres } = useFiltres();

  if (!filtres) return null;

  // Fonction de formatage des valeurs selon leur type
  const formatValeur = <K extends keyof MvtFiltres>(
    cle: K, valeur: MvtFiltres[K]
  ): string => {

    if (valeur === null || valeur === undefined || valeur === "") return "";

    // Gestion spécifique de l'objet période
    if (cle === "periode" && typeof valeur === "object" && "debut" in valeur && "fin" in valeur) {
      const d = new Date(valeur.debut).toLocaleDateString("fr-FR");
      const f = new Date(valeur.fin).toLocaleDateString("fr-FR");
      return `Du ${d} au ${f}`;
    }

    // Format Date
    if (valeur instanceof Date || (typeof valeur === "string" && cle === "jour" && !isNaN(Date.parse(valeur)))) {
      return new Date(valeur).toLocaleDateString("fr-FR");
    }

    // Format Nombre (en entier)
    if (typeof valeur === "number") {
      return Math.round(valeur).toString();
    }

    // Format Chaîne (limité à 10 caractères)
    if (typeof valeur === "string") {
      return valeur.length > 10 ? `${valeur.substring(0, 10)}...` : valeur;
    }

    return String(valeur);
  };

  // Liste des filtres à exclure de la série
  const exclusions = ["pageOrigine", "tva", "dateModif"];

  // Construction de la liste des filtres à afficher
  const filtresAffichables = Object.entries(filtres).filter(([cle, valeur]) => {

    if (valeur === null || valeur === undefined || valeur === "") return false;
    
    if (exclusions.includes(cle)) return false;
    
    // Exclure 'jour' si 'periode' est présent et valide
    return !(cle === "jour" && filtres.periode);


  });

  return (
    <div className={s.fltWrap}>

      {filtresAffichables.map(([cle, valeur]) => {
        const texteAffiche = formatValeur(cle as keyof MvtFiltres, valeur);
        if (!texteAffiche) return null;

        return (
          <div
            key={cle}
            className={s.fltItem}
          >
            <span className={s.fltKey}>{cle}</span>: {texteAffiche}
          </div>
        );
      })}
    </div>
  );
}