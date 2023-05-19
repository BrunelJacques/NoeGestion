import { Component, OnInit } from '@angular/core';


import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_services';
import { ChoixAppliService } from '../_services/choix-appli.service';


import { User } from '@app/general/_models';


//import { first } from 'rxjs/operators';
//import { UserService } from '../_services';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

user = new User();

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private authenticationService: AuthenticationService,
    private choixAppliService: ChoixAppliService,
    )
     {
      this.authenticationService.user.subscribe(x => this.user = x);
      //this.choixAppliService.choixSubject$.subscribe((x => console.log('home constructor subcribe choixSubject: '+x)))
     }
     ;
    
  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
  }

  loadScript(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = name;
      s.async = false;
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }
  appName = environment.appName

  emitSubject(val: string){
    this.choixAppliService.choixSubject$.next(val)
  };

  stocks() {
    this.emitSubject('stocks')

  }

  kms() {
    this.emitSubject('kms')
  }

} 


/**export class HomeComponent {
    loading = false;
    users?: User[];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}*/

