import { hello } from "./index.css";
import { useAuth } from "../../hooks/useAuth.tsx";
import * as s from "../../ap_stocks/pages/Filtres/index.css.ts";
import FieldOrigine from "../../ap_stocks/components/FieldOrigine.tsx";

export function Hello() {
    const { user } = useAuth();
  return (
    <div className={hello}>
      <h5>Hello Noegest user: {user?.lastName}  {user?.firstName}</h5>

      <div className={s.entree}>
        <FieldOrigine
          id={"repas"}
          updateField={(val) => console.log('updateField_new ', val)}
        />
      </div>

    </div>
  );
}

export default Hello
