//src/ap_stocks/pages/Filtres/index.tsx
import { FILTRES0 } from "../../types/params";

import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
import { Form } from "react-router-dom";
import { Origines, PageOrigineValues } from "../../stConstants";
import { Xselect } from "../../../ui/Xselect";
import { useDraftFiltres, useFiltres } from "../../hooks/useFiltres";
import { useSelectEnum } from "../../hooks/useSelectEnum";
import FiltreService from "../../components/FiltreService";
import FiltreOrigine from "../../components/FiltreOrigine";
import FiltreArticle from "../../components/FiltreArticle";
import FiltreFournisseur from "../../components/FiltreFournisseur";


export default function Filtres() {
  const { filtres, setFiltres } = useFiltres(FILTRES0); 

  const { draft, updateField } = useDraftFiltres(filtres)

  const pageOrigine = useSelectEnum(PageOrigineValues, draft.pageOrigine);

  const origineItems = Origines[pageOrigine.value] ?? [];


  // Fonction de soumission du formulaire par bouton "Validation"
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const finalFiltres = {
      ...draft,
      pageOrigine: pageOrigine.value
    }
    setFiltres(finalFiltres)
  }
    
return (
  //Titres sous-titres
  <section className={s.wrapper}>
    <div className="container">
      <h2>Saisie des Filtres</h2>
      <p>Les données appelées après validation seront 
        filtrées sur les paramètres ci-dessous:</p>
    </div>

    {/* zone de saisie des filtres */}
    <div className={s.wrapForm}>
      <Form id="filtresForm" onSubmit={handleSubmit} className={s.formStyle}>

        <div className={s.entree}>
          <Xselect
            label="Page Origine"
            name="pageOrigine"
            value={pageOrigine.value}
            onChange={pageOrigine.onChange}
            options={pageOrigine.options}
          />
        </div>

       <div className={s.entree}>
          <FiltreService 
            id={draft.service} 
            updateField={(val) => updateField('service', val)}
          />
        </div>

        <div className={s.entree}>
          <FiltreFournisseur 
            nom={draft.fournisseur} 
            updateField={(val) => updateField('fournisseur', val)}
          />
        </div>

        <div className={s.entree}>
          <FiltreArticle
            nom={draft.article} 
            updateField={(val) => updateField('article', val)}
          />
        </div>

        <div className={s.entree}>
          <FiltreOrigine 
            filtres={draft}
            updateField={(val) => updateField('origine', val)}
            origineItems={origineItems}
        />
        </div>
 
      </Form>

      <Xbutton type="submit" altClassName="right" form="filtresForm">
        Validation
      </Xbutton>
    </div>

  </section>
  );
}

