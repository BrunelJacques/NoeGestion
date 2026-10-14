//src/ap_stocks/pages/OneMvt/index.tsx
import React, {useCallback, useEffect, useState } from "react";
import * as s from "./index.css.ts";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import { MVT0, type MvtsRetour, type Mouvement, type MvtActif } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields } from "../../constants/lstMvtFields";
import { useParams } from "react-router-dom";
import { OneMvtForm } from "../../components/OneMvtForm.tsx";
import { OneMvtBoutons} from "../../components/OneMvtBoutons.tsx";
import {getFlagsMouvement} from "../../utils/calculs.tsx";

function mvtToPatch(mvt:Mouvement): Mouvement {
  // Transpose le mouvement reçu de l'api en mvtPatch de travail
  const { article, ...leReste} = mvt;
  return {
    ...leReste,
    idArticle: article?.id??0
  };
}

function OneMvt() {
  // Lanceur de forms d'affichage mvtPatch et sa gestion

  const { setError } = useError();
  const { filtres } = useFiltres();

  const [mouvement, setMouvement] = useState<Mouvement>(MVT0); //original
  const [mvtPatch, setMvtPatch] = useState<Mouvement>(mouvement); // envoi modif

  const [formKey, setFormKey] = useState(0);
  const { id: queryId } = useParams<{ id?: string }>();
  const isCreationMode = !queryId;

  const queryParams = new URLSearchParams();

  if (queryId) {
    queryParams.append("id", queryId);
  }
  const url = `${apiUrl.STMOUVEMENT_URL}?${queryParams.toString()}`;

  const fields = lstMvtFields[filtres?.pageOrigine || "sorties"];

  useEffect(() => {
    // Si on est en mode création, on ne 'fetch' rien, on s'assure juste des valeurs par défaut
    if (isCreationMode) {
      setMouvement(MVT0);
      setMvtPatch(MVT0);
      return;
    }

    let isMounted = true;
    const executeFetch = async () => {
      try {
        console.log("Fetching mouvement...",isCreationMode,url);
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
        console.log("Fecch reponse:",isMounted, oneMvt,patch);
        setMouvement(patch);
        setMvtPatch(patch);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
        if (isMounted) {
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
    console.log("useEffect isMounted", isMounted,mvtPatch);

    return () => {
      isMounted = false;
    };
  }, [url, setError, isCreationMode]);

  const updateField = useCallback(
    <K extends keyof NonNullable<MvtActif>>(
      field: K,
      value?: NonNullable<MvtActif>[K] | null
    ) => {
      setMvtPatch((prev) => {
        console.log("updateField_callback", field, value, prev);
        return {
          ...prev,
          [field]: value,
        } as Mouvement; // Assertion ciblée sur le type attendu
      });

    },
    [] // Pas de dépendance nécessaire !
  );

  function resetMouvement() {
    setMvtPatch(mouvement);
    setFormKey((prevKey) => prevKey + 1);
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  //
  e.preventDefault();
  console.log("oneMvt handleSubmit", mvtPatch);

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

    const savedMouvement: Mouvement = await response.json();
    setMouvement(savedMouvement);
    setMvtPatch(mvtToPatch(savedMouvement));
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
                  mouvement={mvtPatch}
                  updateField={updateField}
                  handleSubmit={handleSubmit}
      />
      <OneMvtBoutons resetMouvement={resetMouvement}  />
    </section>
  );
}

export default OneMvt;