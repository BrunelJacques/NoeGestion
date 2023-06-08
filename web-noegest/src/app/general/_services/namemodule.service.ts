import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class NamemoduleService {
  private parentName:string;

  setParentName(name:string){
    this.parentName = name
  }

  getParentName(): string {
    if (this.parentName){
      return this.parentName
    }{
      return ""
    }
  }
}

export class NameappliService {
  public choixSubject$ = new BehaviorSubject<string>('-');
}
