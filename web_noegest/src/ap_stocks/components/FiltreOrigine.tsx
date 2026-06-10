//src/ap_stocks/components/FiltreOrigine.tsx
import {type Origine } from "../constants/services";
import type { Item } from "../types/mvtFiltres";
import { Xautocomplete } from "../../ui/Xautocomplete/noWait";


interface Props {
  id: string | null | undefined;
  updateField: (value: string) => void;
  origineItems: Origine[]
}


// Paramétrage du select pour les origines
export default function FiltreOrigine({ id, updateField, origineItems }: Props) {

  const nom = id ?? String(id) ;

  const fetchOrigines =  (search?: string) => {
    const query = search ?? ""; // search si null ou undefined, sinon ""
    return [
      //{ id: 0, nom: "Tous" },
      ...origineItems
        .filter((u: Origine) => u.libelle && u.libelle.toLowerCase().includes(query.toLowerCase())
        )
        .map((u: Origine) => ({
          id: u.id,
          nom: u.libelle
        }))
    ];
  };


  const handleChange = (item: Item | string) => {
      const id =
        typeof item === "object" && item !== null && "id" in item
          ? String(item.id)
          : String(item);
      
      updateField(id);
    };
    
  return (
      <>
        <Xautocomplete
          label="Origine"
          name="origine"
          value={nom ?? ""}
          fetchItems={fetchOrigines}
          onSelect={handleChange}
          required={true}

        />
      </>
  );
}

