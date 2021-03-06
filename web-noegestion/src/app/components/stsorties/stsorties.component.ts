import { Component, OnInit } from '@angular/core';
import { Mouvement } from 'src/app/models/stmouvement';
import { StMvtService } from 'src/app/services/stmvt.service';
import { MessageService } from 'src/app/services/general/message.service';
import { PARAMS } from 'src/app/models/params';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StsortieComponent } from './stsortie/stsortie.component';

@Component({
  selector: 'app-sorties',
  templateUrl: './stsorties.component.html',
  styleUrls: [ './stsorties.component.scss', ],
})

export class StSortiesComponent implements OnInit {
  params = PARAMS
  selectedMvt?: Mouvement;
  mvts: Mouvement[] = [];

  constructor(
    private stMvtService: StMvtService,
    private messageService: MessageService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
    this.getSorties();
    PARAMS.location= "sorties"
  }/*  */

  loadScript(name: string): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  // appel avec bouton et non par sélection
  openMvt(mvt: Mouvement ) {
    console.log('coucou openMvt')
    this.messageService.add(`Sorties: Clic button id=${mvt.article}`);
    const modalRef = this.modalService.open(StsortieComponent);
    modalRef.componentInstance.mvt = mvt;
  }

  // appel par clic sur une ligne qui se sélectionne au passage
  openSortie(mvt: Mouvement ) {
    console.log('coucou openSortie')
    this.messageService.add(`Sorties: Selected sortie id=${mvt.article}`);
    const modalRef = this.modalService.open(StsortieComponent);
    modalRef.componentInstance.mvt = mvt;
  }

  getSorties(): void {
    this.stMvtService.getSorties()
    .subscribe(mvts => this.mvts = mvts)
  }

}


