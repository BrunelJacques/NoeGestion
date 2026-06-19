//src/ap_stocks/components/FieldFournisseur.tsx

import type { Fournisseurs } from "../types/mvtFiltres";
import type { Item } from "../../ui/Xautocomplete/useAutocomplete.tsx";

import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  value: string | null | undefined;
  updateField: (value: Item|null) => void;
}

// Paramétrage de l'autocomplete pour les fournisseurs
export default function FieldFournisseur({ value, updateField }: Props) {
  const url = apiUrl.STFOURNISSEUR_URL
  console.log("fieldFournisseur", value)

  const fetchFournisseurs = async (search?: string) => {
    const query = search ?? ""; // search si null ou undefined, sinon ""
    const response = await fetch(`${url}?nom=${query}`);
    const fournisseurs: Fournisseurs = await response.json();
    return fournisseurs.results;
  };

  const handleChange = (item: Item | string | number) => {
    const value =
      typeof item === "object" && item !== null && "nom" in item
        ? (item)
        : null;

    updateField(value);
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

