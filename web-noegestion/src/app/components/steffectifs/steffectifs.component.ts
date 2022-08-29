import { Component, OnInit } from '@angular/core';
import {SteffectifsService} from "../../services/steffectifs.service";
import {Effectifs} from "../../models/effectifs";

@Component({
  selector: 'app-steffectifs',
  templateUrl: './steffectifs.component.html',
  styleUrls: ['./steffectifs.component.scss']
})
export class StEffectifsComponent implements OnInit {
  effectifs?: Effectifs[];
  constructor(private steffectifsService :SteffectifsService ) {}

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
    this.retrieveTutorials();
  }

  loadScript(name: string): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  retrieveTutorials(): void {
    console.log("1");
    this.steffectifsService.getEffectifs()
      .subscribe({
        next: (data) => {
          console.log("2");
          this.effectifs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}

