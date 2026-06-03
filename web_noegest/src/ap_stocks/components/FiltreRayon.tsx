//src/ap_stocks/components/FiltreRayon.tsx

import type { Item, Rayons } from "../types/params";
import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  id: string | null | undefined;
  updateField: (id: string) => void;
}


// paramétrage de la saisie du rayon
export default function FiltreRayon({ id, updateField }: Props) {
  const url = apiUrl.STRAYON_URL
  const nom = id ?? String(id) ;

  const fetchRayons = async (search?: string) => {
    const query = search || "";
    const response = await fetch(`${url}?nom=${query}`);
    const rayons: Rayons = await response.json();
    return rayons.results;
  };

  const handleChange = (item: Item | string | number) => {
    const id =
      typeof item === "object" && item !== null && "id" in item
        ? String(item.id)
        : String(item);
    updateField(id);
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

