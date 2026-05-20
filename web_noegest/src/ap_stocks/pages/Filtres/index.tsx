//src/ap_stocks/pages/Filtres/index.tsx

import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
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
import { useEffect, useMemo } from "react";
import FiltreMagasin from "../../components/FiltreMagasin";
import FiltreRayon from "../../components/FiltreRayon";
import { XinputDate } from "../../../ui/variants/XinputDate";


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

  
  // Effet de synchronisation de draft.origine, sans clic sur origine
  useEffect(() => {
    const newOrigine = 
      origineItems.find(a => a.id === draft.origine)?.id //recherche l'item de oldOrigine
      ?? origineItems[0]?.id //oldOrigine pas trouvée dans les items rafraichis
      ?? "" // aucun item trouvé
    ;
    // Ne mettre à jour que si la valeur calculée est différente de l'actuelle
    if (newOrigine !== draft.origine) {
      console.log(`Mise à jour de l'origine: ${draft.origine} -> ${newOrigine}`);
      updateField("origine",newOrigine);
    }

  }, [pageOrigine.value,draft.origine, updateField,origineItems]);
  

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

      <Xbutton type="submit" altClassName="right" form="filtresForm">
        Validation
      </Xbutton>
    </div>

  </section>
  );
}

