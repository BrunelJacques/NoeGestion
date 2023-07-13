import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UrlService {
  public rootUrl$ = new Subject<string>
  public urlActive$ = new Subject<string>
  public templateUrl$ = new Subject<string>
  parentNameSubj$ = new Subject<string>;
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
      this.templateUrl$.next(tblUrl.slice(-1)[0])
    } 
    else { 
      this.rootUrl$.next('-') 
      this.templateUrl$.next('-')
    }
  }

  setParentName(name:string){
    this.parentNameSubj$.next(name)
    console.log('set param: ',this.parentName)
  }

  getParentName(): string {
      return this.parentName
  }
}
