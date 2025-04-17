import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.less'],
  imports: [CommonModule]
})

export class EffectifsComponent  {

  module = new Subscription();
  namemodule = 'effectifs';

  
}
