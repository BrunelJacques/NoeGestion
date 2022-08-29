export class Mouvement {
  constructor(
    public id: number,
    public jour: string,
    public origine: string,
    public article: number,
    public nbunitesvente: any,
    public qtemouvement: number,
    public prixunit: number,
    public repas: number,
    public nbrations: any,
    public rayon: string,
    public analytique: number,
    public transfertCompta?: any | string,
  ){}
}
