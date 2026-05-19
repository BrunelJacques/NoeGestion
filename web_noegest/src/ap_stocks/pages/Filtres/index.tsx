//src/ap_stocks/pages/Filtres/index.tsx

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
import { useEffect, useMemo } from "react";
import FiltreMagasin from "../../components/FiltreMagasin";
import FiltreRayon from "../../components/FiltreRayon";
import FiltreDate from "../../components/FiltreDate";
import { XinputDate } from "../../../ui/variants/XinputDate";


export default function Filtres() {
  const { filtres, setFiltres } = useFiltres(); 

  const { draft, updateField } = useDraftFiltres(filtres)

  const pageOrigine = useSelectEnum(PageOrigineValues, draft.pageOrigine);

  const origineItems = useMemo(
    () => Origines[pageOrigine.value] ?? [],
    [pageOrigine.value]
  );

  // Effet de synchronisation de draft.origine, sans clic sur origine
  useEffect(() => {
    const newOrigine = 
      origineItems.find(a => a.id === draft.origine)?.id //recherche l'item de oldOrigine
      ?? origineItems[0]?.id //oldOrigine pas trouvée dans les items rafraichis
      ?? "" // aucun item trouvé
    ;
    // Ne mettre à jour que si la valeur calculée est différente de l'actuelle
    if (newOrigine !== draft.origine) {
      updateField("origine",newOrigine);
    }
  }, [pageOrigine.value,draft.origine, updateField,origineItems]);
  
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

    {/* zone de saisie fltres */}
    <div className={s.wrapForm}>
      <Form id="filtresForm" onSubmit={handleSubmit} className={s.formStyle}>

{/*        <div className={s.entree}>
          <FiltreDate 
            value={draft.jour} 
            updateField={(val) => updateField('jour', val)}
          />
        </div> */}

        <XinputDate
          jour={draft.jour}
          label="Date jour"
          onChange={(val:Date|null) => updateField('jour', val)}
        />

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

