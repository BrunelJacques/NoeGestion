//src/ap_stocks/pages/OneMvt/index.tsx
import React, {useCallback, useEffect, useState } from "react";
import * as s from "./index.css.ts";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import { MVT0, type MvtPatch, type MvtsRetour } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields } from "../../constants/lstMvtFields";
import { useParams } from "react-router-dom";
import { OneMvtForm } from "../../components/OneMvtForm.tsx";
import { OneMvtBoutons} from "../../components/OneMvtBoutons.tsx";
import { ART0, type Article } from "../../types/article.ts";

function OneMvt() {

  const { setError } = useError();
  const { filtres } = useFiltres();

  const [mouvement, setMouvement] = useState<MvtPatch>(MVT0); //original
  const [mvtPatch, setMvtPatch] = useState<MvtPatch>(MVT0); // modifié
  const [ article, setArticle] = useState<Article>(ART0); //original
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
    // Si on est en mode création, on ne fetch rien, on s'assure juste des valeurs par défaut
    if (isCreationMode) {
      setMouvement(MVT0);
      setMvtPatch(MVT0);
      setArticle(ART0);
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
        const { article, saisie, transfert, ...leReste } = oneMvt;
        setArticle(article);
        const mvtPatch: MvtPatch = {
          ...leReste,
          article: article.id,
        };
        if (isMounted) {
          setMouvement(mvtPatch);
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

    executeFetch();

    return () => {
      isMounted = false;
    };
  }, [url, setError, isCreationMode]); // Ajout de isCreationMode dans les dépendances

  const updateField = useCallback(
    (field: keyof MvtPatch, value?: MvtPatch[keyof MvtPatch]|null
    ) => {
      setMvtPatch(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  function resetMouvement() {
    setMvtPatch(mouvement);
    setFormKey((prevKey) => prevKey + 1);
  }
async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();

  // URL et Méthode dynamiques selon le mode
  const submitUrl = isCreationMode
    ? apiUrl.STMOUVEMENT_URL
    : `${apiUrl.STMOUVEMENT_URL}${mvtPatch.id}/`;

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

    const savedMouvement: MvtPatch = await response.json();
    setMouvement(savedMouvement);
    setMvtPatch(savedMouvement);

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
/*
  Puisque vous passez article (qui vaut ART0) à votre <OneMvtForm/>, assurez-vous que
  votre sous-composant ou votre composant d'autocomplétion (Xautocomplete) gère correctement
  la sélection d'un nouvel article et remonte bien l'ID sélectionné via la fonction
  updateField("article", nouvelId).
*/

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
                  article={article}
                  updateField={updateField}
                  handleSubmit={handleSubmit}
      />
      <OneMvtBoutons resetMouvement={resetMouvement}  />
    </section>
  );
}

export default OneMvt;