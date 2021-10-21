import { Component } from '@angular/core';
import  { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'NoeGestion par le WEB';
  currentApplicationVersion = environment.appVersion;

  options: string[] = [
    'Rajkot',
    'Surat',
    'Delhi', 
    'Mumbai', 
    'Banglore'
  ];

}

