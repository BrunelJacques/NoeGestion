import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UrlService {
  public rootUrl$ = new BehaviorSubject<string>("")
  public urlActive$ = new BehaviorSubject<string>("")
  public templateUrl$ = new BehaviorSubject<string>("")
  parentNameSubj$ = new BehaviorSubject<string>("")
  parentName = "?"

  constructor( private router: Router ){
    this.router.events
      .pipe( filter(event => event instanceof NavigationEnd),)
      .subscribe(() => {this.updateUrl()})
    this.parentNameSubj$.subscribe(
      (value) => {this.parentName = value}
    )
  }

  updateUrl(){
    this.urlActive$.next(this.router.url)
    const tblUrl = this.router.url.split('/')
    if (
      (tblUrl.length > 1) && (tblUrl[1].length >1)
      )
    { this.rootUrl$.next(tblUrl[1]) 
      this.templateUrl$.next(tblUrl[2])
    } 
    else { 
      this.rootUrl$.next('-') 
      this.templateUrl$.next('-')
    }
  }

  setParentName(name:string){
    this.parentNameSubj$.next(name)
  }

  getParentName(): string {
      return this.parentName
  }
}
