import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UrlService} from 'src/app/general/_services';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent implements OnInit {

  module = new Subscription();
  namemodule = 'effectifs';

  constructor(
    private urlService: UrlService,
  ) {}

  ngOnInit(): void {
    this.module = this.urlService.rootUrl$.subscribe(
      (value) => (this.namemodule = value)
    );
    this.namemodule += '/' + this.urlService.getParentName()
  }
}
