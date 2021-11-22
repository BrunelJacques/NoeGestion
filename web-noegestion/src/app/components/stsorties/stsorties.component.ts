import { Component, OnInit } from '@angular/core';
import { Mouvement } from 'src/app/models/stmouvement';
import { StMvtService } from 'src/app/services/stmvt.service';
import { MessageService } from 'src/app/services/general/message.service';
import { PARAMS } from 'src/app/models/params';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StsortieComponent } from './stsortie/stsortie.component';
import { SortieComponent } from './sortie/sortie.component';

@Component({
  selector: 'app-sorties',
  templateUrl: './stsorties.component.html',
  styleUrls: [
    './stsorties.component.scss',
  ],
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
  }

  loadScript(name: string): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = name;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  openMvt(mvt: Mouvement ) {
    this.messageService.add(`Mouvements: Selected mvt id=${mvt.article}`);
    const modalRef = this.modalService.open(StsortieComponent);
    modalRef.componentInstance.mvt = mvt;
  }
  openSortie(mvt: Mouvement ) {
    this.messageService.add(`Mouvements: Selected mvt id=${mvt.article}`);
    const modalRef = this.modalService.open(StsortieComponent);
    modalRef.componentInstance.mvt = mvt;
  }

  getSorties(): void {
    //this.mvts = this.stMvtService.getSorties(); sans observable
    this.stMvtService.getSorties()
    .subscribe(mvts => this.mvts = mvts)
  }

}


