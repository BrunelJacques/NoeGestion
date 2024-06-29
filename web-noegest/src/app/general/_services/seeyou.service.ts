import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, BehaviorSubject, delay, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })


export class SeeyouService {
  // permet les échanges navigation entre subHeader et le component principal du DOM
  // historise les url pour faire des goback convoqués par des modules paratagés

  public clicksOkSubject = new Subject<void>()
  private clicksQuitSubject = new Subject<void>()
  public clicksOk$ = this.clicksOkSubject.asObservable();
  public clicksQuit$ = this.clicksQuitSubject.asObservable();

  public rootActive$ = new BehaviorSubject<string>("")
  public templateActive$ = new BehaviorSubject<string>("")
  public isBtnOk$ = new BehaviorSubject<boolean>(false)
  public isBtnQuit$ = new BehaviorSubject<boolean>(false)
    
  public parentName = "-"

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
          this.updateUrl()
        }
        );
      this.clicksOk$.subscribe(() => {
        this.updateUrl()
      });
    }

  initUrlsHisto(){
    this.urlsHisto = ['//',]
    this.parentName = "-"
  }
  
  updateUrl(){
    const url = this.router.url
    const splitUrl = url.split('/')
    if ((splitUrl.length > 1) && (splitUrl[1].length >1))
    { 
      if (this.urlsHisto[0] !== url)
        {this.urlsHisto.unshift(url)}
      this.rootActive$.next(splitUrl[1]) 
      this.templateActive$.next(splitUrl[2])
      this.setParentName(this.urlsHisto[1])
    } else { 
      this.initUrlsHisto()
      this.rootActive$.next('-') 
      this.templateActive$.next('-')
    }
  }

  emitClickOk() {
    this.clicksOkSubject.next();
  }

  emitClickQuit() {
    this.clicksQuitSubject.next();
  }

  goBack() {
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

  setParentName(urlParent:string) {
    const splitUrl = urlParent.split('/')
    if ((splitUrl.length > 1 ) && (splitUrl[1].length > 1) ) {
      this.parentName = splitUrl[1]
    } else {
      this.parentName = "-"
    }
  }

  getParentName(): string {
    return this.parentName
  }

}
