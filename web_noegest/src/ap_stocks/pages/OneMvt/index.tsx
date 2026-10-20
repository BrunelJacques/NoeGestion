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

function mvtToPatch(mvt:Mouvement): Mouvement {
  // Transpose le mouvement reçu de l'api en mvtPatch de travail
  const { qte_mouvement, ...leReste} = mvt;
  return {
    ...leReste,
    idArticle: leReste.article?.id??0,
    qte_mouvement: qte_mouvement * leReste.sens
  };
}

function OneMvt() {
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

  const fields = lstMvtFields[filtres?.pageOrigine || "sorties"];

  let isMounted = false;

  // Aplique le filtre par patch sur le mouvement
  useEffect(() => {
    if (mvtPatch.origine == filtres.origine &&
        mvtPatch.jour == String(filtres.jour)
    ) { return }
    console.log(">>>>>>> useEffect origine", mvtPatch.origine,"/",filtres.origine);
    setMvtPatch(updateFltrInPatch())
  }, [filtres]);

  // initialise le mouvement à gérer, par fetch si modif ou MVT0 si creation
  useEffect(() => {
    if (isCreationMode) {
      setMouvement(MVT0);
      setMvtPatch(MVT0);
      return;
    }

    if (isMounted) {
      return;
    }
    console.log("useEffect Fetch")

    const executeFetch = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          setError("Échec api mouvement: no response.");
          return; // Ajout d'un return pour éviter de continuer en cas d'erreur
        }
        const mvts: MvtsRetour = await response.json();
        const oneMvt = mvts.results[0];
        if (!oneMvt) {
          setError("Mouvement introuvable.");
          return;
        }
        const patch: Mouvement = mvtToPatch(oneMvt);

        if (!isMounted) {
          return;
        } else {
          setMouvement(patch);
        }
        setMvtPatch(patch);
        console.log("_______ useEffect retour fetch", mvts);

      } catch (error) {
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
    };

    void executeFetch();

    return () => {
      isMounted = true;
    };
  }, [url, setError, isCreationMode]);

  const updateField = useCallback(
    <K extends keyof NonNullable<Mouvement>>(
      field: K,
      value?: NonNullable<Mouvement>[K] | null
    ) => {
      setMvtPatch((prev) => {
        return {
          ...prev,
          [field]: value,
        } as Mouvement; // Assertion ciblée sur le type attendu
      });

    },
    [] // Pas de dépendance nécessaire !
  );

  function updateFltrInPatch(): Mouvement {
    // Importe le changement de filtre dans le mvtPatch
    const { fournisseur, ...leReste } = mvtPatch

    const fourn = filtres?.pageOrigine === "entrees"
      ? filtres?.fournisseur || mouvement?.fournisseur // priorité au filtre si existe
      : undefined; // si non entrée, pas de fournisseur
    console.log("$$$$$$$", filtres.fournisseur,mouvement.fournisseur, "newFourn", fourn)

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

export default OneMvt;