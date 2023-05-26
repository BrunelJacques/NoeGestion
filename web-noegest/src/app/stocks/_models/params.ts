
export interface Params {
  id: number;
  jour: Date;
  origine: string;
  service: number;
  camp: string;
  fournisseur: string;
  tva: string;
  parent: string;
  modif: Date
}

export const  PARAMS: Params= {
  id: 0,
  jour: new Date(),
  origine: "tout",
  service: 0,
  camp: "",
  fournisseur: "",
  tva: "ttc",
  parent: "",
  modif: new Date()
}
