import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginStateService } from '@app/general/_services/login-state.service';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent implements OnInit {

  loginSub = new Subscription();
  choixAppli = 'effectifs init choix appli';
  loginState: LoginStateService

  constructor() {}

  ngOnInit(): void {
    console.log('effectifs ngOnInit')
    //this.loginState.choixSubject$.subscribe(
    //  (value) => (this.choixAppli = value)
    //);
    //this.loginState.choixSubject$.subscribe(
    //  (value) => (console.log(value))
    //);
  }
}
