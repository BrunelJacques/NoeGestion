import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-stinventaire',
  templateUrl: './stinventaire.component.html',
  styleUrls: ['./stinventaire.component.scss']
})
export class StInventaireComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
  }

  loadScript(name: string): void {

    if (isPlatformBrowser(this.platformId)) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = name;
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

}

