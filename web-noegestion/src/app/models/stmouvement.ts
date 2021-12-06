export class Mouvement {
  constructor(
    public qteSortie: any,
    public id: number,
    public jour: string,
    public origine: string,
    public article_id: number,
    public article: string,
    public nbUnitesVente: any,
    public qteMouvement: number,
    public prixUnit: number,
    public repas: string,
    public nbRations: any,
    public nbRationsArt: any,
    public qteParUniteVente: any,
    public qteStock: any,
    public magasin: string,
    public rayon: string,
    public uniteStock: string,
    public uniteVente: string,
    public fournisseur: string,
    public fournisseurArt: string,
    public txTva: any,
    public prixMoyen: any,
    public analytique: string,
    public transfertCompta: any | string,
  ){}
}
  
  