export interface Article {
  id: number|null;
  nom: string|null;
  nom_court?: string;
  qte_stock?: number;
  prix_moyen?: number;
  unite_stock?: string;
  colis_par?: number;
  unite_colis?: string;
  rations?: number;
  fournisseur?: string;
  tx_tva?: number;
  dernier_achat?: string;
}

export interface ArticleNom {
  id: number;
  nom: string;
}
