// service de stockage de la liste des mouvements mais aussi ajout possible
// ajouté dans les providers de app.module.ts
import { Mouvement } from "../models/stmouvement";
import { Subject } from "rxjs";

export class SortieService {
  private sorties!: Mouvement[];
  sortieSubject = new Subject<Mouvement[]>();

  emitSortie() {
    this.sortieSubject.next(this.sorties.slice());
  }

  addSortie(sortie: Mouvement ) {
    console.log(sortie)
    //this.sorties.push(sortie);
    //this.emitSortie();
  }
}
