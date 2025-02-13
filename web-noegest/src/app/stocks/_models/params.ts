
export const  PARAMS0: Params= {
  id: 0,
  jour: new Date(2022,8,17),//valeur pour démo, provisoire
  origine: "repas",
  service: 0,
  camp: "00",
  fournisseur: "",
  tva: "en TTC",
  modif: new Date()
}

export interface Params {
  id: number;
  jour: Date;
  origine: string;
  service: number;
  camp: string;
  fournisseur: string;
  tva: string;
  modif: Date
}

export interface Camp {
  id: 0;
  nom: string;
  abrege: string;
  params: unknown;
}

export interface Fournisseur {
  id: 0;
  nom: string;
}

export interface Rayon {
  id: 0;
  nom: string;
  position: number;
}

export interface Magasin {
  id: 0;
  nom: string;
  position: number;
}

export interface FormField {
  label: string;
  type: string; // 'text', 'number', 'date', 'select', etc.
  value?: unknown;
  visible?: boolean;
  options?: string[]; // For select fields
}

export interface Autocomplete {    
  items: string[], 
  selectedItem: string, 
  width: string
}
