export interface Article {
  id: number;
  nom: string;
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

export const ARTICLE0 : Article = {
  id: 0,
  nom: "",
}

export interface ArticleNom {
  id: number;
  nom: string;
}

export interface ArtsNomRetour {
  count: number;
  results: ArticleNom[];
}
