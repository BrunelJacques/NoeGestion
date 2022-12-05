export class Mouvement {
  constructor(
    public id: number,
    public jour: string,
    public analytique: number,
    public origine: string,
    public article: number,
    public nbcolis: any,
    public qtemouvement: number,
    public prixunit: number,
    public service: number,
    public nbrations: any,
    public transfert: Date,
    public rayon: string,
    public transfertCompta?: any | string,
  ){}
}
