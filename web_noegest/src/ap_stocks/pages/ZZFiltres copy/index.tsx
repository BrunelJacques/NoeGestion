//src/ap_stocks/components/FiltreMvt/index.tsx
import { useFiltres } from "../../hooks/useFiltres";
import { FILTRES0 } from "../../types/params";
import * as s from "../Filtres/index.css";

export default function Filtres() {

  const { filtres, setFiltres } = useFiltres();  
  function resetFiltres() {   
    setFiltres(FILTRES0);
  }

return (

    <section className={s.wrapper}>
      <div className={s.zzentree}>
        {Object.entries(filtres).map(([id, valeur]) => (
          <div key={id} className={s.zzentree}>
            <strong>{id}</strong> : {String(valeur)}
          </div>
        ))}
      </div>
      <div>Jour date: {JSON.stringify(filtres.jour).slice(0, 11)}</div>
      <button onClick={() => resetFiltres()}>Reset Filtres</button>

    </section>
  );
}

