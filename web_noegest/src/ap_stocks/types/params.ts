//src/ap_stocks/types/params.ts

export const  FILTRES0: TypFiltreMvts= {
  pageOrigine: "sorties",
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

export type TypFiltreMvts = {

  pageOrigine: "entrees" | "sorties" | "article" ;
  article?: string[] | null;
  tiers: string;
  jour: Date;
  periode?: { debut: Date; fin: Date } | null;
  origine : string;
  service: number;
  camp?: string;
  fournisseur?: string|null;
  tva: "TTC" | "HT";
}

export type Camp = {
  id: 0;
  nom: string;
  abrege: string;
  params: unknown;
}
export type Camps = {
  count: number;
  results: Camp;
}

export type Fournisseur = {
  id: 0;
  nom: string;
}
export type Fournisseurs = {
  count: number;
  results: Fournisseur[];
}

export type Rayon = {
  id: 0;
  nom: string;
  position: number;
}
export type Rayons = {
  count: number;
  results: Rayon;
}

export type Magasin = {
  id: 0;
  nom: string;
  position: number;
}
export type Magasins = {
  count: number;
  results: Magasin;
}

export type FormField = {
  label: string;
  type: string; // 'text', 'number', 'date', 'select', etc.
  value?: unknown;
  visible?: boolean;
  options?: string[]; // For select fields
}

// générique d'appels noms_xxx
export type Item = {
  id: number ;
  nom: string;
}
