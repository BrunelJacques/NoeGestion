import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { MvtService } from '../_services/mvt.service';
import { Location } from '@angular/common';
import { Params } from '../_models/params';
import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.less']
})

export class SortiesComponent implements OnInit {
  params = new Params
  selectedMvt?: Mouvement;
  sorties: Mouvement[] = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  jour = null;
  location = Location

  constructor(
    private mvtService: MvtService,
    public datepipe: DatePipe
    ) {
      this.getParams();
      this.getSorties();  
     }

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
  }

  loadScript(name: string): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  getSorties(): void {
    this.mvtService.getSorties()
      .subscribe({
        next: (data) => {
          this.sorties = data;
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

  getParams(): void {
    this.mvtService.getParams()
      .subscribe({
        next: (data) => {
          this.params = data[0];
          this.jour = this.pipe.transform(this.params.jour, 'dd/MM/yyyy')
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      })
  }


}

