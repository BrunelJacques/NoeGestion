import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class NameModuleService {

  parentName:string | undefined;
  nameModuleSubject$ = new BehaviorSubject<string>('-');
  routeSub$!: Subscription;
  
  constructor(
    private route: ActivatedRoute
  ){
    this.routeSub$ = this.route.params.subscribe(params => {
      console.log("namemodule; ",params);
    });

  }

  getRoute(){
    this.routeSub$
  }

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
