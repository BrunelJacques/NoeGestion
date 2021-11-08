import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  appName = environment.appName
  appVersion = environment.appVersion
  appYear = environment.appYear
  ngOnInit() {
  }

}
