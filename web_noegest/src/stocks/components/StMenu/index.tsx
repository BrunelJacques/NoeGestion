// src/stocks/components/StocksMenu.tsx
import Xlink from "../../../ui/Xlink";

export interface FiltresProps  {
  className?: string;
}

export function StMenu(props: FiltresProps) {
  return (<>
    <nav className={props.className}>
      <h5>Filtres Actifs:</h5>
      <hr></hr>
      <Xlink to="/stocks/filtres" $isFullLink={true}>
        Filtres
      </Xlink>
      <Xlink to="/stocks/mouvements" $isFullLink={true}>
        Mouvements
      </Xlink>
    </nav>
  </>);
}
