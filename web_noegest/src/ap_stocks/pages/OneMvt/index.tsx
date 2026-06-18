//src/ap_stocks/pages/OneMvt/index.tsx
import React, {useCallback, useEffect, useState } from "react";
import * as s from "./index.css.ts";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import { MVT0, type MvtPatch, type MvtsRetour } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields } from "../../constants/lstMvtFields";
import {useLocation, useParams} from "react-router-dom";
import OneMvtForm from "../../components/OneMvtForm.tsx";
import { ART0, type Article } from "../../types/article.ts";
import {OneMvtBoutons} from "../../components/OneMvtBoutons.tsx";

function OneMvt() {
  const location = useLocation();
  console.log("OneMvt location: ",location.state);

  const { setError } = useError();
  const { filtres } = useFiltres();

  const [mouvement, setMouvement] = useState<MvtPatch>(MVT0); //original
  const [mvtPatch, setMvtPatch] = useState<MvtPatch>(MVT0); // modifié
  const [ article, setArticle] = useState<Article>(ART0); //original
  const [formKey, setFormKey] = useState(0);

  const { id: queryId } = useParams();
  const queryParams = new URLSearchParams();
  if (queryId) {
    queryParams.append("id", queryId);
  }
  const url = `${apiUrl.STMOUVEMENT_URL}?${queryParams.toString()}`;

  const formFields = lstMvtFields[filtres?.pageOrigine || "sorties"];
  const fields = formFields.filter((fld) => !fld.noDisplay);

  useEffect(() => {
    let isMounted = true;

    const executeFetch = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError("Échec api mouvement: no response.");
        }
        const mvts: MvtsRetour = await response.json();
        const oneMvt = mvts.results[0];
        const { article, fournisseur, saisie, transfert, ...leReste } = oneMvt;
        setArticle(article);
        const mvtPatch: MvtPatch = {
          ...leReste,
          article: article.id,
          fournisseur: fournisseur?.id // Sera number ou undefined automatiquement
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

    executeFetch().then(() => {});

    return () => {
      isMounted = false;
    };
  }, [url, setError]);

  const updateField = useCallback(
    (field: keyof MvtPatch, value?: MvtPatch[keyof MvtPatch]|null
    ) => {
      setMvtPatch(prev => ({ ...prev, [field]: value }));
      console.log(`setMvtPatch ${field} value:`,value)
    },
    []
  );

  function resetMouvement() {
    setMvtPatch(mouvement);
    setFormKey((prevKey) => prevKey + 1);
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl.STMOUVEMENT_URL}${mvtPatch.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mvtPatch),
      });

      if (!response.ok) {
        setError("Échec api mouvement: modification non enregistrée.");
        return;
      }

      const savedMouvement: MvtPatch = await response.json();
      setMouvement(savedMouvement);
      setMvtPatch(savedMouvement);
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
                  article={article}
                  updateField={updateField}
                  handleSubmit={handleSubmit}
      />
      <OneMvtBoutons resetMouvement={resetMouvement}  />
    </section>
  );
}

export default OneMvt;