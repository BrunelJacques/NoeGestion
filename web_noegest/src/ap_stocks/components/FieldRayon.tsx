//src/ap_stocks/components/FieldRayon.tsx

import type { Rayons } from "../types/mvtFiltres";
import type { Item } from "../../types/item.ts";
import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  id: string | null | undefined;
  updateField: (id: string) => void;
}


// paramétrage de la saisie du rayon
export default function FieldRayon({ id, updateField }: Props) {
  const url = apiUrl.STRAYON_URL
  const value = id ?? String(id) ;

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
        value={value ?? ""}
        fetchItems={fetchRayons}
        onSelect={handleChange}
      />
    </>
  );
}

