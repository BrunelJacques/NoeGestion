//src/ap_stocks/pages/Filtres/index.tsx
import { useRef } from "react";
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
import { useMemo, useState } from "react";
import XbuttonBack from "../../../ui/Xbutton/XbuttonBack";
import { useError} from "../../../hooks/useError.tsx";

/* Page de saisie des filtres pour les appels de mouvements */
export default function Filtres() {
  const { filtres, setFiltres } = useFiltres();
  const { draft, setDraft, updateField } = useDraftFiltres(filtres);
  const [formKey, setFormKey] = useState(0);
  const { setError } = useError();

  function resetFiltres() {
    setDraft(filtres);
    setFormKey(prevKey => prevKey + 1);
  }

  const pageOrigine = useSelectEnum(PageOrigineValues, draft.pageOrigine);
  const origineItems = useMemo(() => Origines[pageOrigine.value] ?? [], [pageOrigine.value]);
  const isPageArticle = useMemo(() => pageOrigine.value === "article", [pageOrigine.value]);
  const validationRef = useRef<{ validateAll: () => boolean } | null>(null);
 
  // Fonction de soumission du formulaire
  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // On interroge directement la ref du validateur pour valider le formulaire
    if (validationRef.current && !validationRef.current.validateAll()) {
      setError("Validation refusée car présence de champ(s) incorrect(s).")
      console.log("Formulaire invalide, soumission bloquée.");
      return; // On stoppe le submit
    }

    // Tout est valide, on continue le traitement pour enregistrer
    const today = new Date();
    updateField('dateModif', today);
    const finalFiltres = {
      ...draft,
      pageOrigine: pageOrigine.value
    };
    setFiltres(finalFiltres);
    console.log("Filtres validés:", finalFiltres);
  }
    
  return (
    <section className={s.wrapper}>
      <div className="container">
        <h2>Saisie des Filtres</h2>
        <p>Les données appelées après validation seront filtrées sur les paramètres ci-dessous:</p>
      </div>

      <div className={s.wrapForm}>
        {/* On encapsule le formulaire avec notre Provider de validation */}
        <FormValidationProvider formRef={validationRef}>
          <Form
            id="filtresForm"
            key={formKey}
            onSubmit={handleSubmit}
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
                  nom={draft.article?.nom}
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
                nom={draft.fournisseur?.nom}
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

          {/* Ce bouton déclenchera correctement le onSubmit via l'attribut form */}
          <Xbutton type="submit" altClassName="" form="filtresForm">
            <img className={s.goBack} title={"fleche"} src={goBack} alt={"fleche"}/>
            Validation
          </Xbutton>
        </div>
      </div>
    </section>
  );
}