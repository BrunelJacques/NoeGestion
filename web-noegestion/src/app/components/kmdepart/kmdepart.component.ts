import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kmdepart',
  templateUrl: './kmdepart.component.html',
  styleUrls: ['./kmdepart.component.scss']
})
export class KmDepartComponent implements OnInit {

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