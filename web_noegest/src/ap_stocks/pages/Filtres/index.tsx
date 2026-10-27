//src/ap_stocks/pages/Filtres/index.tsx
import { useRef, useEffect, useMemo, useState } from "react";
import { FormValidationProvider } from "../../../contexts/FormContext";
import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
import goBack from "../../../assets/icons/goBack.png"
import { Form } from "react-router-dom";
import { Origines, PageOrigineValues } from "../../constants/origines";
import { Xselect } from "../../../ui/Xselect";
import { useFiltres } from "../../hooks/contextFiltres/useFiltres";
import { useDraftFiltres } from "../../hooks/useDraftFiltres";
import { useSelectEnum } from "../../hooks/useSelectEnum";
import FieldService from "../../components/FieldService.tsx";
import FieldOrigine from "../../components/FieldOrigine.tsx";
import FieldArticle from "../../components/FieldArticle.tsx";
import FieldFournisseur from "../../components/FieldFournisseur.tsx";
import FieldMagasin from "../../components/FieldMagasin.tsx";
import FieldRayon from "../../components/FieldRayon.tsx";
import { XinputDate } from "../../../ui/Xinput/XinputDate";
import XbuttonBack from "../../../ui/Xbutton/XbuttonBack";
import InfoBanner from "../../../components/InfoBanner";

/* Page de saisie des filtres pour les appels de mouvements */
export default function Filtres() {
  const { filtres, setFiltres } = useFiltres();
  const { draft, setDraft, updateField } = useDraftFiltres(filtres);
  const [formKey, setFormKey] = useState(0);
  const [warning, setWarning] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const pageOrigine = useSelectEnum(PageOrigineValues, draft.pageOrigine);
  const origineItems = useMemo(() => Origines[pageOrigine.value] ?? [], [pageOrigine.value]);
  const isPageArticle = useMemo(() => pageOrigine.value === "article", [pageOrigine.value]);
  const validationRef = useRef<{ validateAll: () => boolean } | null>(null);
  const isFirstRender = useRef(true); // Pour ignorer le premier rendu à l'ouverture

  function resetFiltres() {
    setDraft(filtres);
    setFormKey(prevKey => prevKey + 1);
    setIsFormValid(true);
    setHasChanged(false); // Réinitialise l'indicateur de modification
  }

  function validation() {
    // L'utilisateur a effectué une modification, on contrôle la validité
    const isValidResult = validationRef?.current
      ? validationRef.current.validateAll()
      : false;
    setIsFormValid(isValidResult);
    if (!isValidResult) {
      setWarning("Validation impossible avec des erreur(s)");
    }
    return isValidResult;
  }

  // Mise à jour en temps réel
  useEffect(() => {
    // Si c'est le premier rendu (ouverture de la page), on ne fait rien
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const valid = validation()
    // On bloque l'enregistrement  invalide
    if ( !valid ){
      return
    }

    // Tout est valide, on met à jour les filtres globaux en temps réel
    const today = new Date();
    const finalFiltres = {
      ...draft,
      dateModif: today,
      pageOrigine: pageOrigine.value
    };

    // L'utilisateur a effectué une modification
    setFiltres(finalFiltres);
    setHasChanged(true);
  }, [draft, pageOrigine.value, setFiltres, isFormValid]);

  // Action d'enregistrement en stockage
  useEffect(() => {
    // Avertissement de fermeture de page en cas de données invalides modifiées
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFormValid) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanged]);

  return (
    <section className={s.wrapper}>
      <div className="container">
        <h2>Saisie des Filtres</h2>
        <p>Ces filtres par défaut, s'appliquent aux listes et saisies</p>
      </div>

      <div className={s.wrapForm}>
        {/* On encapsule le formulaire avec notre Provider de validation */}
        <FormValidationProvider formRef={validationRef}>
          { !isFormValid && hasChanged ? InfoBanner(warning) : "" }
          <Form
            id="filtresForm"
            key={formKey}
            onSubmit={(e) => e.preventDefault()}
            className={s.formStyle}
          >
            <div className={s.entree}>
              <XinputDate
                jour={draft.jour}
                label="Date jour"
                onChange={(val:Date|null) => updateField('jour', val)}
              />
            </div>

            <div className={s.entree}>
              <Xselect
                label="Mouvements"
                name="pageOrigine"
                value={pageOrigine.value}
                onChange={pageOrigine.onChange}
                options={pageOrigine.options}
              />
            </div>

            <div className={s.entree}>
              <FieldOrigine        // origine
                id={draft.origine}
                updateField={(val) => updateField('origine', val)}
                origineItems={origineItems}
                allowNull={pageOrigine.value === "article"}
              />
            </div>

            <div className={s.entree}>
              {isPageArticle && (
                <FieldArticle
                  nomArt={draft.article?.nom}
                  updateField={(val) => updateField('article', val)}
                />
              )}
            </div>

            <div className={s.entree}>
              <FieldService        // service
                id={draft.service}
                updateField={(val) => updateField('service', val)}
              />
            </div>

            <div className={s.entree}>
              <FieldFournisseur     // fournisseur
                id={draft.fournisseur}
                updateField={(val) => updateField('fournisseur', val)}
              />
            </div>

            <div className={s.entree}>
              <FieldMagasin        // magasin
                id={draft.magasin}
                updateField={(val) => updateField('magasin', val)}
              />
            </div>

            <div className={s.entree}>
              <FieldRayon            // rayon
                id={draft.rayon}
                updateField={(val) => updateField('rayon', val)}
              />
            </div>
          </Form>
        </FormValidationProvider>

        {/*boutons de bas de page*/}
        <div className={s.boutons}>
          <XbuttonBack altClassName={s.altButton} displayPrevious={false}>
            <img className={s.goBack} title={"fleche"} src={goBack} alt={"fleche"} />
            <span>Abandon</span>
          </XbuttonBack>

          <Xbutton altClassName={s.altButton} type="button" onClick={() => resetFiltres()}>
            Reset Filtres
          </Xbutton>
        </div>
      </div>
    </section>
  );
}