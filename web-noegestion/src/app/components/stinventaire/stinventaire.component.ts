import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stinventaire',
  templateUrl: './stinventaire.component.html',
  styleUrls: ['./stinventaire.component.scss']
})
export class StInventaireComponent implements OnInit {

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

