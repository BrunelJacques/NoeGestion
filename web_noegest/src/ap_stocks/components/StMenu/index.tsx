// src/ap_stocks/components/StocksMenu.tsx
import { useUrl } from "../../../hooks/useUrl";
import XbuttonBack from "../../../ui/Xbutton/XbuttonBack";
import Xlink from "../../../ui/Xlink";
import { capitalize } from "../../../utils/string";
import * as s from "./index.css.ts";
import goBack from "../../../assets/icons/goBack.png";

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
      {page != "Filtres" && <Xlink 
      to="/stocks/filtres" 
      $isFullLink={true}>
        Filtres
      </Xlink>}

      {page != "Mouvements" && <Xlink 
      to="/stocks/mouvements" 
      $isFullLink={true}>
        Mouvements
      </Xlink>}
      
      <XbuttonBack altClassName={s.altButton}>
        <img className={s.goBack} title={"fleche"} src={goBack} />
      </XbuttonBack>
    </nav>
  </>);
}
