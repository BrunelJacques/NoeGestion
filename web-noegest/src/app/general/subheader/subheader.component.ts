import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})

export class SubheaderComponent implements OnDestroy{
  bgcolor = "fond-sombre";
  lstUrls = ['stocks','kms']
  isSpecial = false
  rootUrl = ''
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    ){
    this.updateCurrentURL();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateCurrentURL();
      });
  }

  private updateCurrentURL() {
    const tblUrl = this.router.url.split('/')
    if ((tblUrl.length > 1) && (tblUrl[1].length >1))
    { this.rootUrl = tblUrl[1] } 
    else { this.rootUrl = '-' }
    const ix = this.lstUrls.indexOf(this.rootUrl)
    if (ix !== -1){
      this.isSpecial = true;
      this.bgcolor = 'fond-ecran'
    } 
    else { 
      this.isSpecial = false
      this.bgcolor = 'fond-sombre'
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}