
export class Params {
  id: number;
  jour: Date;
  origine: string;
  repas: string;
  camp: string;
  fournisseur: string;
  tva: string;
  parent: string;
  modif: Date
}

export const  PARAMS: Params= {
  id: 0,
  jour: new Date(),
  origine: "repas",
  repas: "tous",
  camp: "",
  fournisseur: "",
  tva: "ttc",
  parent: "",
  modif: new Date()
}
