import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginStateService {
  public choixSubject$ = new Subject<boolean>;
  
  constructor() {}
}
