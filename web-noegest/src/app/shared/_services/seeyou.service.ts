import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })


export class SeeyouService {
  public onSubmitEvent = new EventEmitter(undefined);
  public onGoBackEvent = new EventEmitter(undefined);

  public rootActive$ = new BehaviorSubject<string>("")
  public templateActive$ = new BehaviorSubject<string>("")
  public modeLancement = ""

  urlsHisto: string[] = []

  constructor( 
    private router: Router 
    ){
    console.log("constructor seeyou")
    this.router.events
      .pipe( filter(event => event instanceof NavigationEnd),)
      .subscribe(() => {
        console.log('subject router')
        this.updateUrl()})
    }

  updateUrl(){
    const tblUrl = this.router.url.split('/')
    if (
      (tblUrl.length > 1) && (tblUrl[1].length >1) 
    ){ 

      this.rootActive$.next(tblUrl[1]) 
      this.templateActive$.next(tblUrl[2])
    } 
    else { 
      this.rootActive$.next('-') 
      this.templateActive$.next('-')
    }
    this.historiseUrl(this.router.url)
  }

  historiseUrl(url:string): void{
    if (this.urlsHisto[0] != url)
    {this.urlsHisto.unshift(url)}
    console.log('Historise ',url)
  }

  goBackUrlParent() {
    //route vers le dernier parent inséré et le supprime
    console.log('bye', this.urlsHisto.shift())
    if (this.urlsHisto.length > 1) 
    { this.router.navigate([this.urlsHisto[0]])} 
    else { this.router.navigate(['/'])}
    console.log("goback "+ this.urlsHisto)

  }

  getUrlParent(){
    return this.urlsHisto.shift()
  }
  
  setModeLancement(mode:string) {
    this.modeLancement = mode
  }
}
