
export interface Params {
  jour: Date;
  origine: string;
  repas: string;
  camp: string;
  fournisseur: string;
  tva: string;
  location: string;
}

export const  PARAMS: Params= {
    jour: new Date(),
    origine: "",
    repas: "",
    camp: "",
    fournisseur: "",
    tva: "",
    location: "home"
  }