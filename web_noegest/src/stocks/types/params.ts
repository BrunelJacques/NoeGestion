
export const  FILTRES0: TypFiltre= {
  sens: "entrant",
  tiers: "tous",
  jour: new Date(2022,8,17),//valeur pour démo, provisoire
  origine: "repas",
  service: 0,
  camp: "00",
  fournisseur: "",
  tva: "en TTC",
  modif: new Date()
}

export type TypFiltre = {
  sens: "entrant" | "sortant";
  tiers: string;
  jour: Date;
  origine: string;
  service: number;
  camp: string;
  fournisseur: string;
  tva: string;
  modif: Date
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

