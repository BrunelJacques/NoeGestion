import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.modules';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  imports: [SharedModule, RouterLink]
})
export class InfoComponent {}
