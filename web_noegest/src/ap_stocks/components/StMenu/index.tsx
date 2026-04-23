// src/ap_stocks/components/StocksMenu.tsx
import { useUrl } from "../../../hooks/useUrl";
import Xlink from "../../../ui/Xlink";
import { capitalize } from "../../../utils";

export interface FiltresProps  {
  className?: string;
}

export function StMenu(props: FiltresProps) {

  const { segments } = useUrl();
  const page = capitalize( segments[1] || segments[0] );


  return (<>
    <nav className={props.className}>
      <h5>{page}</h5>
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
