export class Mouvement {
  constructor(
    public id: number,
    public jour: string,
    public analytique: number,
    public origine: string,
    public fournisseur: string,
    public article_id: number,
    public nbcolis: any,
    public qtemouvement: number,
    public prixunit: number,
    public service: number,
    public nbrations: any,
    public article_nom: string,
    public article_rayon: string,
    public article_magasin: string,
    public transfert: Date,
  ){}
}
