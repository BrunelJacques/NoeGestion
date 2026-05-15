//src/ap_stocks/components/FiltreMagasin.tsx

import type { Magasin, Magasins } from "../types/params";
import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  nom: string | null | undefined;
  updateField: (value: string) => void;
}

export default function FiltreMagasin({ nom, updateField }: Props) {
  const url = apiUrl.STMAGASIN_URL

  const fetchMagasins = async (search: string) => {
    const response = await fetch(`${url}?nom=${search}`);
    const magasins: Magasins = await response.json();
    return [
      //{ id: 0, nom: "Tous" },
      ...magasins.results
        .filter((u: Magasin) => u.nom && u.nom.toLowerCase().includes(search.toLowerCase())
        )
        .map((u: Magasin) => ({
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
        label="Magasin"
        name="magasin"
        value={nom ?? ""}
        fetchItems={fetchMagasins}
        onSelect={handleChange}
      />
    </>
  );
}

