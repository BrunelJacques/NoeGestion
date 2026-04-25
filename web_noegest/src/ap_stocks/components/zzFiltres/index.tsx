//src/ap_stocks/components/FiltreMvt/index.tsx
import { useFiltresStocks } from "../../hooks/useFiltres";
import { FILTRES0 } from "../../types/params";
import * as s from "./index.css";

export default function Filtres() {

  const { filtres, setFiltres } = useFiltresStocks(FILTRES0);
  
  function resetFiltres() {
    const filtres0 = FILTRES0;
    setFiltres(filtres0);
  }

  return (
    <div className={s.card}>
      <span>Filtres mouvements</span>
      <span>AAAA AA</span>
      <span>bbbb bbb</span>
      <span>aaaaa a_______bb bbbbb</span>
      <div>Filtres lus: {JSON.stringify(filtres)}</div>
      <div className={s.debug}>
        {Object.entries(filtres).map(([id, valeur]) => (
          <div key={id} className={s.ligne}>
            <strong>{id}</strong> : {String(valeur)}
          </div>
        ))}
      </div>
      <div>Jour date: {JSON.stringify(filtres.jour).slice(0, 11)}</div>
      <button onClick={() => resetFiltres()}>Reset Filtres</button>
    </div>
  );
}

