export interface Filtres {
  jour: string;
  origine: string;
  fournisseur: string;
  tva: string;
  article: string;
  location: string;
}

export const  FILTRES: Filtres= {
    jour: "2021-08-02",
    origine: "repas",
    fournisseur: "",
    tva: "HT",
    article: "",
    location: "home"
  }