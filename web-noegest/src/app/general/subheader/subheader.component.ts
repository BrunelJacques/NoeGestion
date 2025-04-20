import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeeyouService } from '../_services';
import { CommonModule } from '@angular/common';
import { SubheaderMvtsComponent } from "../../stocks/mouvements/subheader-mvts/subheader-mvts.component";
import { SubheaderBtnsComponent } from "./subheader-btns/subheader-btns.component";

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
  standalone: true,
  imports: [CommonModule, SubheaderMvtsComponent, SubheaderBtnsComponent]
})

export class SubheaderComponent implements OnInit, OnDestroy {

  bgcolor = 'fond-sombre'
  lstUrls = ['stocks','kms']
  lstMvt = ['params','sorties','onesortie']
  mvt = false
  boutons = false

  constructor(
    private seeyouService: SeeyouService,
    ){}

  ngOnInit(): void {
    this.seeyouService.templateActive$.subscribe(
      (template) => {
        this.mvt = (this.lstMvt.indexOf(template)!= -1 );
        this.boutons = (template === 'register')
      })
  }

  ngOnDestroy(): void {
    this.seeyouService.templateActive$.unsubscribe()
    this.seeyouService.rootActive$.unsubscribe()
  }

}
