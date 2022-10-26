import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginStateService {
  public choixSubject$ = new BehaviorSubject<string>('-');
  
  constructor() {}
}
