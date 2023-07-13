import { Component } from '@angular/core';
import { NameModuleService } from 'src/app/general/_services';

@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
  styleUrls: ['./subheader-mvts.component.scss']
})

export class SubheaderMvtsComponent {
  constructor(
    private nameModule: NameModuleService,
  ){}
}
