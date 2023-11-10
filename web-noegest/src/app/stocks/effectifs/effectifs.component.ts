import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeeyouService } from 'src/app/shared/_services';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less']
})

export class EffectifsComponent  {

  module = new Subscription();
  namemodule = 'effectifs';

  
}
