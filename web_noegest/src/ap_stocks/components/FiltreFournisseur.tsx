//src/ap_stocks/components/FiltreFournisseur.tsx
import type { Fournisseur, Fournisseurs } from "../types/params";

import type  { TypFiltreMvts } from "../types/params";
import apiUrl from "../../constants/api.Constants";
import { Xautocomplete } from "../../ui/Xautocomplete";

interface Props {
  id: number;
  updateField: (value: number) => void;
}

export default function FiltreFournisseur(filtres:TypFiltreMvts) {
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
   
  return (
    <>
      <Xautocomplete 
        label="Fournisseur"
        name="fournisseur"
        fetchItems={fetchFournisseurs}
        onSelect={(item) => {
          console.log('Sélectionné:', item)
        }}
        placeholder={filtres.fournisseur ?? undefined}
      />
    </>
  );
}

