import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeeyouService } from 'src/app/shared/_services';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent implements OnInit {

  module = new Subscription();
  namemodule = 'effectifs';

  constructor(
    private seeyouService: SeeyouService,
  ) {}

  ngOnInit(): void {
    this.module = this.seeyouService.rootActive$.subscribe(
      (value) => (this.namemodule = value)
    );
  }
}
