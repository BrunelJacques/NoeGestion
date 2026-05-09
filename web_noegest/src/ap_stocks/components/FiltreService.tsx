//src/ap_stocks/components/FiltreService.tsx
import { Services } from "../stConstants";

import { Xselect } from "../../ui/Xselect";
import type  { TypFiltreMvts } from "../types/params";
import { useSelectObject } from "../hooks/useSelectObject";


export default function FiltreService(filtres:TypFiltreMvts) {

const service = useSelectObject(Services, filtres.service);

return (
      <>
        <Xselect<string|number>
          label="Service"
          name="service"
          value={service.value}
          onChange={service.onChange}
          options={service.options}
        />
      </>
  );
}

