import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NameappliService, NamemoduleService } from 'src/app/general/_services';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent implements OnInit {

  choixSub = new Subscription();
  choixAppli: string = 'effectifs';

  constructor(
    private namemoduleService: NamemoduleService,
    private choixAppliService: NameappliService,
  ) {}

  ngOnInit(): void {
    this.choixSub = this.choixAppliService.choixSubject$.subscribe(
      (value) => (this.choixAppli = value)
    );
    this.choixAppli += '/' + this.namemoduleService.getParentName()
  }
}
