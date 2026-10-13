import { hello } from "./index.css";
import * as s from "../../ap_stocks/pages/Filtres/index.css.ts";
import FieldArticle from "../../ap_stocks/components/FieldArticle.tsx";
import getUser from "../../utils/getUser.tsx";

export function Hello() {
  const clientUser = getUser();
  return (
    <div className={hello}>
      <h5>Hello Noegest user: {clientUser}</h5>

      <div className={s.entree}>
        <FieldArticle
          nomArt={"32"}
          updateField={(val) => console.log('updateField_new ', val)}
        />
      </div>

    </div>
  );
}

export default Hello
