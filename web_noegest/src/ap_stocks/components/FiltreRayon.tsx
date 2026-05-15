//src/ap_stocks/components/FiltreRayon.tsx

import type { Rayon, Rayons } from "../types/params";
import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  nom: string | null | undefined;
  updateField: (value: string) => void;
}

export default function FiltreRayon({ nom, updateField }: Props) {
  const url = apiUrl.STRAYON_URL

  const fetchRayons = async (search: string) => {
    const response = await fetch(`${url}?nom=${search}`);
    const rayons: Rayons = await response.json();  
        return [
          //{ id: 0, nom: "Tous" },
          ...rayons.results
            .filter((u: Rayon) => u.nom && u.nom.toLowerCase().includes(search.toLowerCase())
            )
            .map((u: Rayon) => ({
              id: u.id,
              nom: u.nom
            }))
        ];
      };
  const handleChange = (item: { id: number; nom: string } | string | number) => {
    const value =
      typeof item === "object" && item !== null && "nom" in item
        ? (item.nom)
        : String(item);

    updateField(value);
  }

  return (
    <>
      <Xautocomplete
        label="Rayon"
        name="rayon"
        value={nom ?? ""}
        fetchItems={fetchRayons}
        onSelect={handleChange}
      />
    </>
  );
}

