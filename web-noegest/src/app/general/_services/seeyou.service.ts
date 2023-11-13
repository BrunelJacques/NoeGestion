import { EventEmitter, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, delay, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })


export class SeeyouService {
  // historise les url pour faire des goback convoqués par des modules paratagés

  public onSubmitEvent = new EventEmitter(undefined);
  public onGoBackEvent = new EventEmitter(undefined);


  public rootActive$ = new BehaviorSubject<string>("")
  public templateActive$ = new BehaviorSubject<string>("")
  public modeLancement = ""

  urlsHisto: string[] = ['/',]

  constructor( 
    private router: Router 
    ){
      this.router.events
        .pipe( 
          filter(event => event instanceof NavigationEnd),
          delay(500),
        )
        .subscribe(() => {
          this.updateUrl()})
    }

  initUrlsHisto(){
    this.urlsHisto = ['//',]
  }
  
  updateUrl(){
    const url = this.router.url
    const splitUrl = url.split('/')
    if (this.urlsHisto[0] !== url) {      
      if ((splitUrl.length > 1) && (splitUrl[1].length >1))
      { 
        if (this.urlsHisto[0] != url)
          {
            this.urlsHisto.unshift(url)
          } 
        this.rootActive$.next(splitUrl[1]) 
        this.templateActive$.next(splitUrl[2])
      } else { 
        this.initUrlsHisto()
        this.rootActive$.next('-') 
        this.templateActive$.next('-')
      }
    }
  }

  goBackUrlParent() {
    //route vers le dernier parent inséré et le supprime
    if (this.urlsHisto.length > 1) 
    { 
      const url = this.urlsHisto[1]
      this.urlsHisto.shift()
      this.router.navigate([url])}
    else { this.router.navigate(['/'])}

  }

  getUrlParent(){
    return this.urlsHisto[1]
  }
  
  setModeLancement(mode:string) {
    this.modeLancement = mode
  }
}
