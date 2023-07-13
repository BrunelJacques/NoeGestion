import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class NameModuleService {
  public rootUrl$ = new Subject<string>
  public urlActive$ = new Subject<string>
  parentName:string | undefined;
  
  constructor( private router: Router ){
    this.router.events
      .pipe( filter(event => event instanceof NavigationEnd),)
      .subscribe(() => {this.updateUrl()})
  }

  updateUrl(){
    this.urlActive$.next(this.router.url)
    const tblUrl = this.router.url.split('/')
    if (
      (tblUrl.length > 1) && (tblUrl[1].length >1)
      )
    { this.rootUrl$.next(tblUrl[1]) } 
    else { this.rootUrl$.next('-') }
  }


  getUrlActive(){
    this.urlActive$
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
