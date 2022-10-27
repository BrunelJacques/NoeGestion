import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChoixAppliService } from '@app/general/_services/choix-appli.service';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent implements OnInit {

  choixSub = new Subscription();
  choixAppli: string = 'effectifs';

  constructor(
    private choixAppliService: ChoixAppliService
  ) {}

  ngOnInit(): void {
    this.choixSub = this.choixAppliService.choixSubject$.subscribe(
      (value) => (this.choixAppli = value)
    );
  }
}
