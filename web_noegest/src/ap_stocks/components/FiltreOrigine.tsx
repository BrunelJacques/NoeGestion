//src/ap_stocks/components/FiltreOrigine.tsx
import {type Origine } from "../stConstants";
import type { Item, TypFiltreMvts } from "../types/params";
import { Xautocomplete } from "../../ui/Xautocomplete/noWait";


interface Props {
  filtres: TypFiltreMvts;
  updateField: (value: string) => void;
  origineItems: Origine[]
}


// Paramétrage du select pour les origines
export default function FiltreOrigine({ filtres, updateField, origineItems }: Props) {


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
      const value =
        typeof item === "object" && item !== null && "id" in item
          ? String(item.nom)
          : String(item);
      
      updateField(value);
    };
    
  return (
      <>
        <Xautocomplete
          label="Origine"
          name="origine"
          value={filtres.origine ?? ""}
          fetchItems={fetchOrigines}
          onSelect={handleChange}
          required={true}

        />
      </>
  );
}

