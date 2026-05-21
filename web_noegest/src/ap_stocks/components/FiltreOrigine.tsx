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


  const fetchOrigines = async (search?: string) => {
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


/* 
  const getOrigine = (id: string): string => {
    const origine = origineItems.find((o) => o.id === id);
    console.log(`getOrigine: id=${id} -> ${origine ? origine.libelle : "non trouvé"}`);
    return origine ? origine.libelle : "";
  }
 */

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

        />
      </>
  );
}

