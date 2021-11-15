export interface Params {
  jour: Date;
  origine: string;
  fournisseur: string;
  tva: string;
  article: string;
  location: string;
}

export const  PARAMS: Params= {
    jour: new Date(),
    origine: "repas",
    fournisseur: "",
    tva: "HT",
    article: "",
    location: "home"
  }