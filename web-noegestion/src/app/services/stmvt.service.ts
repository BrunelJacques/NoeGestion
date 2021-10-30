import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Mouvement } from '../models/stmouvement';
import { MOUVEMENTS } from '../models/mock-test-mvts';
import { MessageService } from './general/message.service';

@Injectable({
  providedIn: 'root'
})

export class StMvtService {

  constructor(private messageService: MessageService) { }

  getMvts(): Observable<Mouvement[]> {
    const mvts = of(MOUVEMENTS);
    this.messageService.add('StMvtService: cherche mvts');
    return mvts
  }
}
