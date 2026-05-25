//src/ap_stocks/pages/Filtres/index.tsx

import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
import goBack from "../../../assets/icons/goBack.png"
import { Form } from "react-router-dom";
import { Origines, PageOrigineValues } from "../../stConstants";
import { Xselect } from "../../../ui/Xselect";
import { useFiltres } from "../../hooks/useFiltres";
import { useDraftFiltres } from "../../hooks/useDraftFiltres";
import { useSelectEnum } from "../../hooks/useSelectEnum";
import FiltreService from "../../components/FiltreService";
import FiltreOrigine from "../../components/FiltreOrigine";
import FiltreArticle from "../../components/FiltreArticle";
import FiltreFournisseur from "../../components/FiltreFournisseur";
import FiltreMagasin from "../../components/FiltreMagasin";
import FiltreRayon from "../../components/FiltreRayon";
import { XinputDate } from "../../../ui/variants/XinputDate";
import { useMemo } from "react";
import BackButton from "../../../ui/BackButton";


export default function Filtres() {
  const { filtres, setFiltres } = useFiltres(); 

  const { draft, updateField } = useDraftFiltres(filtres)

  const pageOrigine = useSelectEnum(PageOrigineValues, draft.pageOrigine);

  const origineItems = useMemo(
    () => Origines[pageOrigine.value] ?? [],
    [pageOrigine.value]
  );

  const isPageArticle = useMemo(
    () => pageOrigine.value === "article" ,
    [pageOrigine.value]
  );

  // Fonction de soumission du formulaire par bouton "Validation"
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const today = new Date();
    updateField('dateModif', today) // date du jour
    const finalFiltres = {
      ...draft,
      pageOrigine: pageOrigine.value
    }
    setFiltres(finalFiltres)
    console.log("Filtres validés:", finalFiltres)
  }
    
return (
  //Titres sous-titres
  <section className={s.wrapper}>
    <div className="container">
      <h2>Saisie des Filtres</h2>
      <p>Les données appelées après validation seront 
        filtrées sur les paramètres ci-dessous:</p>
    </div>

    {/* zone de saisie fltres */}
    <div className={s.wrapForm}>
      <Form id="filtresForm" onSubmit={handleSubmit} className={s.formStyle}>

        <div className={s.entree}>
          <XinputDate
            jour={draft.jour}
            label="Date jour"
            onChange={(val:Date|null) => updateField('jour', val)}
          />
        </div>
        
        <div className={s.entree}>
          <Xselect
            label="Mouvements" // pageOrigine
            name="pageOrigine"
            value={pageOrigine.value}
            onChange={pageOrigine.onChange}
            options={pageOrigine.options}
          />
        </div>

        <div className={s.entree}>
          <FiltreOrigine 
            filtres={draft}
            updateField={(val) => updateField('origine', val)}
            origineItems={origineItems}
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
          <FiltreMagasin 
            nom={draft.magasin} 
            updateField={(val) => updateField('magasin', val)}
          />
        </div>

        <div className={s.entree}>
          <FiltreRayon 
            nom={draft.rayon} 
            updateField={(val) => updateField('rayon', val)}
          />
        </div>

        <div className={s.entree}>
          {isPageArticle && (
            <FiltreArticle
              nom={draft.article} 
              updateField={(val) => updateField('article', val)}
            />
          )}
        </div>
 
      </Form>

      <div className={s.boutons}>
        <BackButton altClassName={s.altButton}>
          <img className={s.goBack} title={"fleche"} src={goBack} />
          <span>Abandon</span>
        </BackButton>
        
        <Xbutton type="submit" altClassName="" form="filtresForm">
          <img className={s.goBack} title={"fleche"} src={goBack} />
          Validation
        </Xbutton>
      </div>
    </div>

  </section>
  );
}

