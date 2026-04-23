
export const  FILTRES0: TypFiltre= {
  page: "sorties",
  article: null,
  tiers: "tous",
  jour: new Date(2022,8,17),//valeur pour démo, provisoire
  periode: null,
  origine: "cuisine",
  service: 0,
  camp: "00",
  fournisseur: null,
  tva: "TTC",
}

export type TypFiltre = {

  page: "entrées" | "sorties" | "article" ;
  article?: string | null;
  tiers: string;
  jour: Date;
  periode?: { debut: Date; fin: Date } | null;
  origine : string;
  service: number;
  camp: string;
  fournisseur?: string | null;
  tva: "TTC" | "HT";
}

export type Camp = {
  id: 0;
  nom: string;
  abrege: string;
  params: unknown;
}

export type Fournisseur = {
  id: 0;
  nom: string;
}

export type Rayon = {
  id: 0;
  nom: string;
  position: number;
}

export type Magasin = {
  id: 0;
  nom: string;
  position: number;
}

export type FormField = {
  label: string;
  type: string; // 'text', 'number', 'date', 'select', etc.
  value?: unknown;
  visible?: boolean;
  options?: string[]; // For select fields
}

