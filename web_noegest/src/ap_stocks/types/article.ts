
export type Article = {
  id: number;
  nom: string;
  nom_court?: string;
  qte_stock: number;
  prix_moyen: number;
  unite_stock?: string;
  colis_par?: number;
  unite_colis?: string;
  rations?: number;
  fournisseur?: number;
  tx_tva?: number;
  dernier_achat?: string;
}

export const ART0 : Article = {
  id: 0,
  nom: "",
  prix_moyen:0,
  qte_stock:0
}

export type Articles = {
  count: number;
  results: Article[];
}

