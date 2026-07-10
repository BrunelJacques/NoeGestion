//src/ap_stocks/components/FieldFournisseur.tsx

import type { Fournisseurs } from "../types/mvtFiltres";
import type { Item } from "../../types/item.ts";

import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  id: number | null | undefined;
  updateField: (id: number|string|null) => void;
}

// Paramétrage de l'autocomplete pour les fournisseurs
export default function FieldFournisseur({ id, updateField }: Props) {
  const url = apiUrl.STFOURNISSEUR_URL

  const fetchFournisseurs = async (search?: string) => {
    const query = search ?? ""; // search si null ou undefined, sinon ""
    const response = await fetch(`${url}?nom=${query}`);
    const fournisseurs: Fournisseurs = await response.json();
    return fournisseurs.results;
  };

  const handleChange = (item: Item | string | number) => {
    const id =
      typeof item === "object" && item !== null && "nom" in item
        ? (item.id)
        : null;
    updateField(id);
  }

  return (
    <>
      <Xautocomplete
        label="Fournisseur"
        name="fournisseur"
        value={id ?? ""}
        fetchItems={fetchFournisseurs}
        onSelect={handleChange}
      />
    </>
  );
}

