import React, { useEffect, useState } from "react";
import * as s from "./index.css.ts";
import { dicCalculs } from "../../utils/calculs.tsx";
import { SpanCell } from "../../../ui/SpanCell";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { apiUrl } from "../../../constants/api.Constants";
import { MVT0, type Mouvement, type MvtsRetour } from "../../types/mouvement";
import { useError } from "../../../hooks/useError";
import { lstMvtFields } from "../../constants/lstMvtFields";
import { getCellValue } from "../../../utils/getCellValue";
import { Xinput } from "../../../ui/Xinput";
import { Xbutton } from "../../../ui/Xbutton";
import XbuttonBack from "../../../ui/Xbutton/XbuttonBack";
import goBack from "../../../assets/icons/goBack.png";
import {Form, useParams} from "react-router-dom";

function OneMvt() {
  const { setError } = useError();
  const { filtres } = useFiltres();

  const [mouvement, setMouvement] = useState<Mouvement>(MVT0);
  const [draft, setDraft] = useState<Mouvement>(MVT0);
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
        const fetchedMouvement = mvts.results[0] || MVT0;

        if (isMounted) {
          setMouvement(fetchedMouvement);
          setDraft(fetchedMouvement);
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

  function updateField<K extends keyof Mouvement>(fieldName: K, value: Mouvement[K]) {
    setDraft((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function resetMouvement() {
    setDraft(mouvement);
    setFormKey((prevKey) => prevKey + 1);
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl.STMOUVEMENT_URL}${draft.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      if (!response.ok) {
        setError("Échec api mouvement: modification non enregistrée.");
        return;
      }

      const savedMouvement: Mouvement = await response.json();
      setMouvement(savedMouvement);
      setDraft(savedMouvement);
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
        <h2>Saisie des Filtres</h2>
        <p>Les données appelées après validation seront
          filtrées sur les paramètres ci-dessous:</p>
      </div>

      {/* zone de saisie */}
      <div className={s.wrapForm}>
        <Form
          id="oneMvtForm"
          key={formKey}
          onSubmit={handleSubmit}
        >
          <div className={s.formStyle}>
            {fields.map((fld) => {
              const val = getCellValue(draft, fld, dicCalculs);
              const isEditable = Boolean(
                fld.fieldName &&
                !fld.subFieldName &&
                !fld.calcul
              );

              return (
                <div
                  key={`field-${draft.id}-${fld.label}`}
                >
                  {isEditable && fld.fieldName ? (
                    <Xinput
                      type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                      value={String(draft[fld.fieldName] ?? "")}
                      showReset={false}
                      onChange={(evt) => {
                        const nextValue =
                          fld.type === "number"
                            ? Number(evt.target.value)
                            : evt.target.value;

                        updateField(
                          fld.fieldName!,
                          nextValue as Mouvement[typeof fld.fieldName]
                        );
                      }}
                    />
                  ) : typeof val === "number" ? (
                    <SpanCell
                      value={val}
                      justify={fld.justify}
                      nbDecimals={fld.nbDecimals}
                      width={fld.width}
                    />
                  ) : (
                    <SpanCell
                      value={String(val)}
                      justify={fld.justify}
                      width={fld.width}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Form>

        <div className={s.boutons}>
          <XbuttonBack altClassName={s.altButton} displayPrevious={false}>
            <img className={s.goBack} title="fleche" src={goBack} alt={'fleche'} />
            <span>Retour</span>
          </XbuttonBack>

          <Xbutton
            type="button"
            altClassName={s.altButton}
            onClick={resetMouvement}
          >
            Abandon
          </Xbutton>

          <Xbutton type="submit" altClassName="" form="oneMvtForm">
            Validation
          </Xbutton>
        </div>
      </div>
    </section>
  );
}

export default OneMvt;