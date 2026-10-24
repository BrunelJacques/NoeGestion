//src/ap_stocks/pages/OneMvt/index.tsx
import React, {useCallback, useEffect, useState } from "react";
import * as s from "./index.css.ts";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import { MVT0, type MvtsRetour, type Mouvement } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields } from "../../constants/lstMvtFields";
import { useParams } from "react-router-dom";
import { OneMvtForm } from "../../components/OneMvtForm.tsx";
import { OneMvtBoutons} from "../../components/OneMvtBoutons.tsx";
import {getFlagsMouvement} from "../../utils/calculs.tsx";
import {dateToISO} from "../../../utils/dates.tsx";

// Crée une Mise en cache pour cette page
const movementCache = new Map<string, Mouvement>();

function mvtToPatch(mvt:Mouvement): Mouvement {
  // Transpose le mouvement reçu de l'api en mvtPatch de travail
  const { qte_mouvement, ...leReste} = mvt;
  return {
    ...leReste,
    idArticle: leReste.article?.id??0,
    qte_mouvement: qte_mouvement * leReste.sens
  };
}

export default function OneMvt() {
  // Lanceur de forms d'affichage mvtPatch et sa gestion
  const { setError } = useError();
  const { filtres } = useFiltres();

  const [mouvement, setMouvement] = useState<Mouvement>(MVT0); //original
  const [mvtPatch, setMvtPatch] = useState<Mouvement>(mouvement); // envoi modif

  const [formKey, setFormKey] = useState(0); // pour identifier chaque field dans form
  const { id: queryId } = useParams<{ id?: string }>();
  const isCreationMode = !queryId;

  const queryParams = new URLSearchParams();
  if (queryId) {
    queryParams.append("id", queryId);
  }
  const url = `${apiUrl.STMOUVEMENT_URL}?${queryParams.toString()}`;
  const urlPatch = `${url}-patch`

  const fields = lstMvtFields[filtres?.pageOrigine || "sorties"];

  useEffect(() => {
    if (!mvtPatch || mvtPatch.id === 0) return;
    movementCache.set(url,mouvement);
    movementCache.set(urlPatch,mvtPatch);
  }, [mvtPatch]);

  // initialise le mouvement à gérer, par fetch si modif ou MVT0 si creation
  useEffect(() => {
    if (isCreationMode) {
      setMouvement(MVT0);
      setMvtPatch(MVT0);
      return;
    }

    // 1. Vérifier si on a déjà les données en cache pour cette URL
    if (movementCache.has(url)) {
      const cachedData = movementCache.get(url)!;
      const cachedPatch = movementCache.get(urlPatch)!;
      setMouvement(cachedData);
      setMvtPatch(cachedPatch);
      console.log("useEffect: Utilisation du cache pour l'URL", cachedData, cachedPatch);
      return;
    }

    let isCurrent = true; // Pour éviter les mises à jour d'état si le composant se démonte

    const executeFetch = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (isCurrent) setError("Échec api mouvement: no response.");
          return; // Ajout d'un return pour éviter de continuer en cas d'erreur
        }
        const mvts: MvtsRetour = await response.json();
        const oneMvt = mvts.results[0];
        if (!oneMvt) {
          if (isCurrent) setError("Mouvement introuvable.");
          return;
        }
        const patch: Mouvement = mvtToPatch(oneMvt);

        if (isCurrent) {
          // 2. Stocker dans le cache avant d'appliquer
          setMouvement(patch);
          setMvtPatch(patch);
        }

      } catch (error) {
        if (isCurrent) {
          console.error("Erreur lors du fetch :", error);
          setError(
            [
              "Échec d'appel à l'API des mouvement.",
              error instanceof Error ? error.message : String(error),
            ]
              .filter(Boolean)
              .join(" - ")
          );
        }
      }
    };
    void executeFetch();

    return () => {
      isCurrent = false;
    };
  }, [url, setError]);


// useEffect3: Applique le filtre par patch sur le mouvement en cours
  useEffect(() => {
    setMvtPatch((prev) => {
      // On vérifie avec la valeur la plus récente (prev), au lieu de mvtPatch ancien
      if (
        prev.origine === filtres.origine &&
        prev.jour === String(filtres.jour)
      ) {
        return prev; // Aucun changement nécessaire, on retourne l'état actuel tel quel
      }
      return filtresInPatch(prev);
    });
  }, [filtres]);

  const updateField = useCallback(
    <K extends keyof NonNullable<Mouvement>>(
      field: K,
      value?: NonNullable<Mouvement>[K] | null
    ) => {
      setMvtPatch((prev) => {
        return {
          ...prev,
          [field]: value,
        } as Mouvement;
      });
    },
    [urlPatch]
  );

  function filtresInPatch(patch: Mouvement): Mouvement {
    // Importe le changement de filtre dans le mvtPatch
    const { fournisseur, ...leReste } = patch

    const fourn = filtres?.pageOrigine === "entrees"
      ? filtres?.fournisseur || mouvement?.fournisseur // priorité au filtre si existe
      : undefined; // si non entrée, pas de fournisseur

    return {
      ...leReste,
      jour: dateToISO(filtres.jour),
      origine: filtres.origine,
      sens: (filtres.pageOrigine == "sorties")? -1 : 1,
      fournisseur: fourn
    }
  }

  function resetMouvement() {
    setMvtPatch(mouvement);
    setFormKey((prevKey) => prevKey + 1);
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {

    console.log("OneMvt handleSubmit", mvtPatch);

    e.preventDefault();

    const flags = getFlagsMouvement()
    flags.map((modif) => (
        updateField(modif[0], modif[1])
      ));


    // URL et Méthode dynamiques selon le mode
    const submitUrl = isCreationMode
      ? apiUrl.STMOUVEMENT_URL
      : `${apiUrl.STMOUVEMENT_URL}${mvtPatch}/`;

    const method = isCreationMode ? "POST" : "PATCH";

    try {
      console.log("try handleSubmit");
      const response = await fetch(submitUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mvtPatch),
      });

      if (!response.ok) {
        setError(`Échec api mouvement: ${isCreationMode ? "création" : "modification"} non enregistrée.`);
        return;
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      setError(
        [
          "Échec d'enregistrement du mouvement.",
          error instanceof Error ? error.message : String(error),
        ]
          .filter(Boolean)
          .join(" - ")
      );
    }
  }

  return (
    //Titres sous-titres
    <section className={s.wrapper}>
      <div className="container">
        <h2>Saisie d'un mouvement</h2>
        <p>Les données appelées après validation seront
          filtrées selon les choix affichés</p>
      </div>

      <OneMvtForm formKey={formKey}
                  fields={fields}
                  mvtPatch={mvtPatch}
                  setMvtPatch={setMvtPatch}
                  updateField={updateField}
                  onSubmit={handleSubmit}
                  id="oneMvtForm"
      />
      <OneMvtBoutons resetMouvement={resetMouvement}
                     onSubmit={handleSubmit}
      />
    </section>
  );
}
