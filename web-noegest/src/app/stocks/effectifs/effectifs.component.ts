import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NameModuleService} from 'src/app/general/_services';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent implements OnInit {

  module = new Subscription();
  namemodule = 'effectifs';

  constructor(
    private moduleService: NameModuleService,
  ) {}

  ngOnInit(): void {
    this.module = this.moduleService.rootUrl$.subscribe(
      (value) => (this.namemodule = value)
    );
    this.namemodule += '/' + this.moduleService.getParentName()
  }
}
