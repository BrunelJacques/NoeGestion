//src/ap_stocks/components/FiltreFournisseur.tsx
import type { Fournisseur, Fournisseurs } from "../types/params";

import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  nom: string | null | undefined;
  updateField: (value: string) => void;
}

export default function FiltreFournisseur({ nom, updateField }: Props) {
  const url = apiUrl.STFOURNISSEUR_URL

  const fetchFournisseurs = async (search: string) => {
    const response = await fetch(`${url}?nom=${search}`);
    const fournisseurs: Fournisseurs = await response.json();
    return fournisseurs.results
      .filter((u: Fournisseur) => u.nom && u.nom.toLowerCase().includes(search.toLowerCase()))
      .map((u: Fournisseur) => ({
        id: u.id,
        nom: u.nom
      }));
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
        label="Fournisseur"
        name="fournisseur"
        value={nom ?? ""}
        fetchItems={fetchFournisseurs}
        onSelect={handleChange}
      />
    </>
  );
}

