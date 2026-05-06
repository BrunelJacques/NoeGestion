//src/ap_stocks/components/Filtres/index.tsx
import { FILTRES0 } from "../../types/params";
import { Xinput } from "../../../ui/Xinput";
import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
import { Form } from "react-router-dom";
import { Origines, PageOrigine, Services } from "../../stConstants";
import { Xselect } from "../../../ui/Xselect";
import { useFiltresStocks } from "../../hooks/useFiltres";
import { useSelectEnum } from "../../hooks/useSelectEnum";
import { useSelectObject } from "../../hooks/useSelectObject";

export default function Filtres() {

  const { filtres, setFiltres } = useFiltresStocks(FILTRES0); 

  const pageOrigine = useSelectEnum(PageOrigine, filtres.pageOrigine);
  const service = useSelectObject(Services, filtres.service);
  const origine = useSelectObject(Origines[pageOrigine.value], "sorties"); 
  

  // Fonction de soumission du formulaire par bouton "Validation"
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    console.log("Filtres Submitted!")
    e.preventDefault();
    setFiltres({
      ...filtres,
      service: service.value, // ← ID du service
    });
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
          <Xselect<number|string>
            label="Service"
            name="service"
            value={service.value}
            onChange={service.onChange}
            options={service.options}
          />
        </div>

        <div className={s.entree}>
          <Xselect<number|string>
            label="Origine"
            name="origine"
            value={origine.value}
            onChange={origine.onChange}
            options={origine.options}
          />
        </div>
 

        {Object.entries(filtres).map(([id, valeur]) => (
          <div className={s.entree} key={id}>
            <Xinput
            value={String(valeur)}
            label={id}
            id={id}
            />
        </div>
        ))}
      </Form>
      <Xbutton type="submit" altClassName="right" form="filtresForm">
        Validation
      </Xbutton>
    </div>

  </section>
  );
}

