import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService} from 'src/app/general/_services';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent implements OnInit {

  module = new Subscription();
  namemodule = 'effectifs';

  constructor(
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.module = this.sharedService.rootActive$.subscribe(
      (value) => (this.namemodule = value)
    );
  }
}
