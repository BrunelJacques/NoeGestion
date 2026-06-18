//src/ap_stocks/components/OneMvtBoutons.tsx
import { Xbutton } from "../../ui/Xbutton";
import XbuttonBack from "../../ui/Xbutton/XbuttonBack";
import goBack from "../../assets/icons/goBack.png";
import * as s from "../pages/OneMvt/index.css.ts";

interface Props {
  resetMouvement: () => void;
}


export function OneMvtBoutons({ ...prp }: Props ) {

  return (

    <div className={s.boutons}>
      <XbuttonBack altClassName={s.altButton} displayPrevious={true}>
        <img className={s.goBack} title="fleche" src={goBack} alt={'AVXX_'} />
      </XbuttonBack>

      <Xbutton
        type="button"
        altClassName={s.altButton}
        onClick={prp.resetMouvement}
      >
        Abandon
      </Xbutton>

      <Xbutton type="submit" altClassName="" form="oneMvtForm">
        Validation
      </Xbutton>
    </div>
  )

}

