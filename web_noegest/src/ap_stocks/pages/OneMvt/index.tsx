//src/ap_stocks/pages/OneMvt/index.tsx
import React, {useCallback, useEffect, useState } from "react";
import * as s from "./index.css.ts";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import { MVT0, type MvtPatch, type MvtsRetour, type Mouvement } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields } from "../../constants/lstMvtFields";
import { useParams } from "react-router-dom";
import { OneMvtForm } from "../../components/OneMvtForm.tsx";
import { OneMvtBoutons} from "../../components/OneMvtBoutons.tsx";

function mvtToPatch(mvt:Mouvement):MvtPatch {
  const { article, saisie, transfert, ...leReste} = mvt;
  return {
    ...leReste,
    IdArticle: article.id,
  };
}

function OneMvt() {

  const { setError } = useError();
  const { filtres } = useFiltres();

  const [mouvement, setMouvement] = useState<Mouvement>(MVT0); //original
  const [mvtPatch, setMvtPatch] = useState<MvtPatch>(null); // modifié
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
      setMvtPatch(null);
      return;
    }

    let isMounted = true;
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

        const mvtPatch: MvtPatch = mvtToPatch(oneMvt);

        if (isMounted) {
          setMouvement(oneMvt);
          setMvtPatch(mvtPatch);
        }
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

    return () => {
      isMounted = false;
    };
  }, [url, setError, isCreationMode]); // Ajout de isCreationMode dans les dépendances

  const updateField = useCallback(
    <K extends keyof NonNullable<MvtPatch>>(
      field: K,
      value?: NonNullable<MvtPatch>[K] | null
    ) => {
      setMvtPatch(prev => {
        // Si le patch est null, on initialise à partir de l'objet mouvement courant
        const base: NonNullable<MvtPatch> = prev ?? {
          id: mouvement.id,
          jour: mouvement.jour,
          sens: mouvement.sens,
          origine: mouvement.origine,
          IdArticle: mouvement.article?.id,
          nb_colis: mouvement.nb_colis,
          qte_mouvement: mouvement.qte_mouvement,
          prix_unit: mouvement.prix_unit,
          service: mouvement.service,
          rations: mouvement.rations,
          analytique: mouvement.analytique,
          fournisseur: mouvement.fournisseur,
          ordi: mouvement.ordi,
        };
        return {
          ...base,
          [field]: value,
        };
      });
    },
    [mouvement]
  );

  function resetMouvement() {
    setMvtPatch(null);
    setFormKey((prevKey) => prevKey + 1);
  }

async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("oneMvt handleSubmit", mvtPatch);

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

    // Optionnel : Si vous voulez rediriger l'utilisateur sur la page de modification
    // avec le nouvel ID généré par l'API après une création réussie, vous pouvez
    // utiliser le hook useNavigate() ici.

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
                  mouvement={mouvement}
                  updateField={updateField}
                  handleSubmit={handleSubmit}
      />
      <OneMvtBoutons resetMouvement={resetMouvement}  />
    </section>
  );
}

export default OneMvt;