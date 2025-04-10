import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-effectifs',
    templateUrl: './effectifs.component.html',
    styleUrls: ['./effectifs.component.less'],
    standalone: false
})

export class EffectifsComponent  {

  module = new Subscription();
  namemodule = 'effectifs';

  
}
