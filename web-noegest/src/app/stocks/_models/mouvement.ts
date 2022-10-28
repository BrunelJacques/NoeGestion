export class Mouvement {
  constructor(
    public id: number = 0,
    public jour: string = '',
    public origine: string = '',
    public article: number = 0,
    public nbunitesvente: any = '',
    public qtemouvement: number = 0,
    public prixunit: number = 0,
    public repas: number = 0,
    public nbrations: any = 0,
    public rayon: string = '',
    public analytique: number = 0,
    public transfertCompta?: any | string,
  ){}
}
