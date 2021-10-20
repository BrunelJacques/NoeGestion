// service à gérer pour canActivate dans app-routing

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentifierService {

  constructor() { }
  
  loggedin (): boolean{
    return true;
  }
}
