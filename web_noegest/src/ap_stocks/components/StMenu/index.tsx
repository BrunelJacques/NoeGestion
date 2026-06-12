//src/ap_stocks/components/StMenu.tsx

import { useUrl } from "../../../hooks/useUrl";
import XbuttonBack from "../../../ui/Xbutton/XbuttonBack";
import Xlink from "../../../ui/Xlink";
import { capitalize } from "../../../utils/string";
import * as s from "./index.css.ts";
import goBack from "../../../assets/icons/goBack.png";
import { AfficheFiltres } from "./AfficheFiltres.tsx";
import {useFiltres} from "../../hooks/contextFiltres/useFiltres.tsx";

export interface FiltresProps  {
  className?: string;
}

export function StMenu(props: FiltresProps) {

  const { segments } = useUrl(); // récup du nom de la page selon l'url
  const page = capitalize( segments[1] || segments[0] );

  const { filtres } = useFiltres();
  if (!filtres) return null;
  return (<>
    <nav className={props.className}>
      <div  className={s.entete}>
        <XbuttonBack altClassName={s.altButton} displayPrevious={false}>
          <img className={s.goBack} title={"fleche"} src={goBack} alt={"fleche"} />
        </XbuttonBack>

        <div key="pageOrigine" className={s.fltOrigine}>
          {filtres.pageOrigine}
        </div>
      </div>
      <hr></hr>

      <AfficheFiltres />

      <div className={s.boutons}>
        {page != "Filtres" && <Xlink
        to="/stocks/filtres"
        $isFullLink={true}
        altClassName={s.xlink}>
          Filtres
        </Xlink>}

        {page != "Mouvements" && <Xlink
        to="/stocks/mouvements"
        $isFullLink={true}
        altClassName={s.xlink}>
          Mouvements
        </Xlink>}
      </div>
    </nav>
  </>);
}
