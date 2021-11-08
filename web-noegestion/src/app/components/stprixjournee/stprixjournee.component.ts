import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stprixjournee',
  templateUrl: './stprixjournee.component.html',
  styleUrls: ['./stprixjournee.component.scss']
})
export class StPrixJourneeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
  }

  loadScript(name: string): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

}

