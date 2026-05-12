//src/ap_stocks/components/FiltreOrigine.tsx
import {type Origine } from "../stConstants";
import { Xselect } from "../../ui/Xselect";
import { useSelectObject } from "../hooks/useSelectObject";
import type { TypFiltreMvts } from "../types/params";


interface Props {
  filtres: TypFiltreMvts;
  updateField: (value: string) => void;
  origineItems: Origine[]
}


export default function FiltreOrigine({ filtres, updateField, origineItems }: Props) {

  const initialOrigineId = origineItems[0]?.id ?? "";
  const origine = useSelectObject(origineItems, initialOrigineId);

  const handleChange = (newValue: string | number) => {
    origine.onChange(newValue); // Met à jour l'affichage local du select
    updateField(String(newValue)); // Remonte l'info au parent
  };
  
return (
      <>
        <Xselect<number|string>
          label="Origine"
          name="origine"
          value={filtres.origine}
          onChange={handleChange}
          options={origine.options}
        />
      </>
  );
}

