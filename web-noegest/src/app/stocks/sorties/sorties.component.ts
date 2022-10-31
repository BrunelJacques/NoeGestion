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
  mvts: Mouvement[] = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private sortiesService: MvtService,
    public datepipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
    this.retrieveTutorials();
    PARAMS.location= "sorties"
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
    this.datepipe.transform(Date.now(), 'yyyy/MM/dd')
  }/*  */

  loadScript(name: string): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  retrieveTutorials(): void {
    console.log("1");
    this.sortiesService.getSorties()
      .subscribe({
        next: (data) => {
          console.log("2");
          this.mvts = data;
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

