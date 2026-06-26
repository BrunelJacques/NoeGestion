//src/ap_stocks/components/FieldFournisseur.tsx

import type { Fournisseurs } from "../types/mvtFiltres";
import type { Item } from "../../types/item.ts";

import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  value: number | null | undefined;
  updateField: (value: number|string|null) => void;
}

// Paramétrage de l'autocomplete pour les fournisseurs
export default function FieldFournisseur({ value, updateField }: Props) {
  const url = apiUrl.STFOURNISSEUR_URL

  const fetchFournisseurs = async (search?: string) => {
    const query = search ?? ""; // search si null ou undefined, sinon ""
    const response = await fetch(`${url}?nom=${query}`);
    console.log("fetch fournisseurs query:",query);
    const fournisseurs: Fournisseurs = await response.json();
    console.log("fetch fournisseurs lus:",fournisseurs.results);
    return fournisseurs.results;
  };

  const handleChange = (item: Item | string | number) => {
    const val =
      typeof item === "object" && item !== null && "nom" in item
        ? (item.id)
        : null;
    updateField(val);
  }

  return (
    <>
      <Xautocomplete
        label="Fournisseur"
        name="fournisseur"
        value={value ?? ""}
        fetchItems={fetchFournisseurs}
        onSelect={handleChange}
      />
    </>
  );
}

