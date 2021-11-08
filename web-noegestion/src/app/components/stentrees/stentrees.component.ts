import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrees',
  templateUrl: './stentrees.component.html',
  styleUrls: ['./stentrees.component.scss']
})
export class StEntreesComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
  }

  loadScript(name: string): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    s.async = false;
    document.getElementsByTagName('head')[0].appendChild(s);
  }
}
