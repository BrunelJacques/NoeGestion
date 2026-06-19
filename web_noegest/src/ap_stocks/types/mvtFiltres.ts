//src/ap_stocks/types/mvtFiltres.ts
import type { Item }  from "../../types/item.ts";

export type MvtFiltres = {

  pageOrigine: "entrees" | "sorties" | "article" ;
  article?: Item | null;
  jour: Date;
  periode?: { debut: Date; fin: Date } | null; //se substitue à jour pour élagrir la recherche
  origine : string; // Attention : peut être à blanc
  service: number;
  camp?: string|null; // uniquement géré lors d'origine camp in ou out
  fournisseur?: number | null;
  magasin?: string;
  rayon?: string;
  tva: string; // sera géré dans la page de saisie d'un mouvement achat
  dateModif?: Date; // sert de repère pour remise à zéro auto des filtres anciens
}

export const  FILTRES0: MvtFiltres= {
  pageOrigine: "sorties",
  article: null,
  jour: new Date(2022,9,17),//valeur pour démo, provisoire
  periode: null,
  origine: "cuisine",
  service: 0,
  camp: "",
  fournisseur: null,
  magasin: "",
  rayon: "",
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

export type Fournisseurs = {
  count: number;
  results: Item[];
}

export type Rayons = {
  count: number;
  results: Item[];
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
