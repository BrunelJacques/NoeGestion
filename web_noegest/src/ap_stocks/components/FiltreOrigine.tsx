//src/ap_stocks/components/FiltreOrigine.tsx
import {type Origine } from "../stConstants";
import type { Item, TypFiltreMvts } from "../types/params";
import { Xautocomplete } from "../../ui/Xautocomplete";


interface Props {
  filtres: TypFiltreMvts;
  updateField: (value: string) => void;
  origineItems: Origine[]
}


// Paramétrage du select pour les origines
export default function FiltreOrigine({ filtres, updateField, origineItems }: Props) {

const getOrigineItems = async (): Promise<Item[]> => {
    return origineItems.map((o) => ({
      id: o.id, 
      nom: o.libelle
    }));
  };

const getOrigine = (id: string): string => {
  const origine = origineItems.find((o) => o.id === id);
  console.log(`getOrigine: id=${id} -> ${origine ? origine.libelle : "non trouvé"}`);
  return origine ? origine.libelle : "";
}


const handleChange = (item: Item) => {
    updateField(String(item.id));
  };
  

return (
      <>
        <Xautocomplete
          label="Origine"
          name="origine"
          value={getOrigine(filtres.origine)}
          fetchItems={getOrigineItems}
          onSelect={handleChange}

        />
      </>
  );
}

