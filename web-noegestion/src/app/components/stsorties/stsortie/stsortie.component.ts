import { Component, Input, OnInit } from '@angular/core';
import { Mouvement } from 'src/app/models/stmouvement';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stsortie',
  templateUrl: './stsortie.component.html',
  styleUrls: ['./stsortie.component.scss'],
})
export class StsortieComponent implements OnInit {
  @Input()
  mvt!: Mouvement;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {}
}
