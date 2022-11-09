import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { MvtService } from '../_services/mvt.service';
import { PARAMS } from '../_models/params';
import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.less']
})

export class SortiesComponent implements OnInit {
  params = PARAMS
  selectedMvt?: Mouvement;
  sorties: Mouvement[] = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  

  constructor(
    private mvtService: MvtService,
    public datepipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
    this.getSorties();
    PARAMS.location= "sorties"
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
    this.datepipe.transform(Date.now(), 'yyyy/MM/dd') 
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
          console.log(data);
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

}

