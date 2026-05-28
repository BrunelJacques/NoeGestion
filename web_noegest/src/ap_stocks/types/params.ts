//src/ap_stocks/types/params.ts

export type TypFiltreMvts = {

  pageOrigine: "entrees" | "sorties" | "article" ;
  article?: string | null;
  jour: Date;
  periode?: { debut: Date; fin: Date } | null;
  origine : string;
  service: number;
  camp?: string|null;
  fournisseur?: string;
  magasin?: string;
  rayon?: string;
  tva: string;
  dateModif?: Date;
}

export const  FILTRES0: TypFiltreMvts= {
  pageOrigine: "sorties",
  article: null,
  jour: new Date(2022,8,17),//valeur pour démo, provisoire
  periode: null,
  origine: "cuisine",
  service: 0,
  camp: "",
  fournisseur: "",
  tva: "TTC",
  dateModif: new Date(),
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
}

export type Rayons = {
  count: number;
  results: Rayon[];
}

export type Magasin = {
  id: 0;
  nom: string;
  position: number;
}
export type Magasins = {
  count: number;
  results: Magasin[];
}

// générique d'appels items
export type Item = {
  id: number|string; 
  nom: string;
}
