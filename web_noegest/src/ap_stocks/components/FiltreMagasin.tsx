//src/ap_stocks/components/FiltreMagasin.tsx

import type { Item, Magasins } from "../types/params";
import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  id: string | null | undefined;
  updateField: (id: string) => void;
}

// Paramétrage de l'autocomplete pour les magasins
export default function FiltreMagasin({ id, updateField }: Props) {
  const url = apiUrl.STMAGASIN_URL
  const nom = id ?? String(id) ;

  const fetchMagasins = async (search?: string) => {
    const query = search || "";
    const response = await fetch(`${url}?nom=${query}`);
    const magasins: Magasins = await response.json();
    return magasins.results;
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
        label="Magasin"
        name="magasin"
        value={nom ?? ""}
        fetchItems={fetchMagasins}
        onSelect={handleChange}
      />
    </>
  );
}

