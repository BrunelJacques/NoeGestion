//src/ap_stocks/components/Filtres/index.tsx
import { useFiltresStocks } from "../../hooks/useFiltres";
import { FILTRES0 } from "../../types/params";
import { Xinput } from "../../../ui/Xinput";
import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
import { Form } from "react-router-dom";

export default function Filtres() {

  const { filtres, setFiltres } = useFiltresStocks(FILTRES0);  

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // todo
    console.log("call Filtres Submit!")
    }
    
return (

  <section className={s.wrapper}>
    <div className="container">
      <h2>Saisie des Filtres</h2>
      <p>Les données appelées après validation seront filtrées sur les paramètres ci-dessous :</p>
    </div>

    <div className={s.wrapForm}>
      <form onSubmit={handleSubmit} className={s.formStyle}>
        {Object.entries(filtres).map(([id, valeur]) => (
          <div className={s.entree} key={id}>
            <Xinput
            value={String(valeur)}
            label={id}
            placeholder="adresse mail"
            autoComplete="email"
            />
        </div>
        ))}
      </form>
      <Xbutton type="submit" altClassName="right" >
        Validation
      </Xbutton>
    </div>


  </section>
  );
}

