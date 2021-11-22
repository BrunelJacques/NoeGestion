import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Mouvement } from 'src/app/models/stmouvement';
import { StMvtService } from 'src/app/services/stmvt.service';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  mvt!: Mouvement;
  constructor(
    private route: ActivatedRoute,
    private stMvtService: StMvtService,
    private location: Location    
  ) { }

  ngOnInit(): void {
    this.getSortie()
  }

  getSortie():Mouvement {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    return this.stMvtService.getSortiesNoObs().filter((proj: { id: number; }) => proj.id == id)[0];
  }

}