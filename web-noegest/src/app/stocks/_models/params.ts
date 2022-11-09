
export interface Params {
  jour: Date;
  origine: string;
  repas: string;
  camp: string;
  fournisseur: string;
  tva: string;
  location: string;
  modif: Date
}

export const  PARAMS: Params= {
  jour: new Date(),
  origine: "cuisine",
  repas: "",
  camp: "",
  fournisseur: "",
  tva: "ttc",
  location: "home",
  modif: new Date()
}
