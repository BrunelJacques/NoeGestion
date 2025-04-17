import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './general/_alert';
import { HeaderComponent } from './general/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  imports: [RouterModule, AlertComponent, HeaderComponent ]
})
export class AppComponent {
  title = 'noegestion';
}
