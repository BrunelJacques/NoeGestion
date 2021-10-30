import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-kmdepart',
  templateUrl: './kmdepart.component.html',
  styleUrls: ['./kmdepart.component.scss']
})
export class KmDepartComponent implements OnInit {

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
