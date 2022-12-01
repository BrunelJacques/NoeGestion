
export interface Params {
  jour: Date;
  origine: string;
  service: string;
  camp: string;
  fournisseur: string;
  tva: string;
  location: string;
}

export const  PARAMS: Params= {
    jour: new Date(),
    origine: "cuisine",
    service: "",
    camp: "",
    fournisseur: "",
    tva: "ttc",
    location: "home"
  }
