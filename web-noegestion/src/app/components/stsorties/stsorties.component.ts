import { Component, OnInit } from '@angular/core';
import { Mouvement } from 'src/app/models/stmouvement';
import { StMvtService } from 'src/app/services/stmvt.service';
import { MessageService } from 'src/app/services/general/message.service';
import { PARAMS } from 'src/app/models/params';

@Component({
  selector: 'app-sorties',
  templateUrl: './stsorties.component.html',
  styleUrls: [
    './stsorties.component.scss',
  ],
})

export class StSortiesComponent implements OnInit {
  jour = new Date('2021-05-02');
  //date1 =  new FormControl(new Date());
  origine: String = "Repas en cuisine";

  selectedMvt?: Mouvement;
  rayon = ''
  magasin = ''
  mvts: Mouvement[] = [];

  constructor(private stMvtService: StMvtService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
    this.getMvts();
    PARAMS.location= "sorties"
  }

  onSelect(mvt: Mouvement): void {
    this.selectedMvt = mvt;
    this.rayon = mvt.rayon;
    this.magasin = mvt.magasin;
    this.messageService.add(`HeroesComponent: Selected hero id=${mvt.id}`);
  }
  loadScript(name: string): void {

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  getMvts(): void {
    //this.mvts = this.stMvtService.getMvts(); sans observable
    this.stMvtService.getMvts()
    .subscribe(mvts => this.mvts = mvts)
  }

}



