import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent  {
  
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
