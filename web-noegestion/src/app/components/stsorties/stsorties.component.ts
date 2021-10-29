import { Component, OnInit } from '@angular/core';
import { Mouvement } from 'src/app/models/stmouvement';
import { StMvtService } from 'src/app/services/stmvt.service';
import { MessageService } from 'src/app/services/message.service';

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
    this.getMvts();
  }

  onSelect(mvt: Mouvement): void {
    this.selectedMvt = mvt;
    this.rayon = mvt.rayon;
    this.magasin = mvt.magasin;
    this.messageService.add(`HeroesComponent: Selected hero id=${mvt.id}`);
  }

  getMvts(): void {
    //this.mvts = this.stMvtService.getMvts(); sans observable
    this.stMvtService.getMvts()
    .subscribe(mvts => this.mvts = mvts)
  }

}



