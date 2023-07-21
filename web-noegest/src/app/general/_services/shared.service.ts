import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SharedService {
  public onSubmitEvent = new EventEmitter(undefined);
  public onGoBackEvent = new EventEmitter(undefined);

  public urlActive$ = new BehaviorSubject<string>("")
  public rootActive$ = new BehaviorSubject<string>("")
  public templateActive$ = new BehaviorSubject<string>("")

  urlsHisto: string[] = []

  constructor( 
    private router: Router 
    ){
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
    { this.rootActive$.next(tblUrl[1]) 
      this.templateActive$.next(tblUrl[2])
    } 
    else { 
      this.rootActive$.next('-') 
      this.templateActive$.next('-')
    }
  }

  setUrlParent(){
    // stocke l'url actuelle pour un prochain retour par onGoBack
    const url = this.router.url
    if (this.urlsHisto[0] != url)
    {this.urlsHisto.unshift(url)}
    console.log('hello setUrlParent',url)
  }

  goBackUrlParent() {
    //route vers le dernier parent inséré et le supprime
    if (this.urlsHisto.length > 0) 
    { this.router.navigate([this.urlsHisto.shift()])} 
    else { this.router.navigate(['/'])}      
  }
}
