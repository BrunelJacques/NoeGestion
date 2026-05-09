//src/ap_stocks/components/FiltreOrigine.tsx
import type { PageOrigine } from "../stConstants";
import { Origines } from "../stConstants";

import { Xselect } from "../../ui/Xselect";
import type  { TypFiltreMvts } from "../types/params";
import { useSelectObject } from "../hooks/useSelectObject";

type Props = {
  filtres: TypFiltreMvts;
  pageOrigine:PageOrigine;
};

//un seul param pour une fonction donc on encadre {}
export default function FiltreOrigine({ filtres, pageOrigine }: Props) {

  const origineItems = Origines[pageOrigine] ?? [];
  const initialOrigineId = origineItems[0]?.id ?? "";
  const origine = useSelectObject(origineItems, initialOrigineId);

return (
      <>
        <Xselect<number|string>
          label="Origine"
          name="origine"
          value={filtres.origine}
          onChange={origine.onChange}
          options={origine.options}
        />
      </>
  );
}

