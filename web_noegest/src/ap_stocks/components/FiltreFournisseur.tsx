//src/ap_stocks/components/FiltreFournisseur.tsx

import type { Fournisseurs, Item } from "../types/mvtFiltres";
import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  nom: string | null | undefined;
  updateField: (value: string) => void;
}

// Paramétrage de l'autocomplete pour les fournisseurs
export default function FiltreFournisseur({ nom, updateField }: Props) {
  const url = apiUrl.STFOURNISSEUR_URL

  const fetchFournisseurs = async (search?: string) => {
    const query = search ?? ""; // search si null ou undefined, sinon ""
    const response = await fetch(`${url}?nom=${query}`);
    const fournisseurs: Fournisseurs = await response.json();
    return fournisseurs.results;
  };

  const handleChange = (item: Item | string | number) => {
    const value =
      typeof item === "object" && item !== null && "nom" in item
        ? (item.nom)
        : String(item);

    updateField(value);
  }

  return (
    <>
      <Xautocomplete
        label="Fournisseur"
        name="fournisseur"
        value={nom ?? ""}
        fetchItems={fetchFournisseurs}
        onSelect={handleChange}
      />
    </>
  );
}

