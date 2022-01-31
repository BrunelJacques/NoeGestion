import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Mouvement } from 'src/app/models/stmouvement';
import { StMvtService } from 'src/app/services/stmvt.service';
import { SortieService } from 'src/app/services/sortie.service';


@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css'],
})

export class SortieComponent implements OnInit {
  sortie!: Mouvement;
  mvts!: Mouvement[];
  sortieForm!: FormGroup;
  returnUrl!: string;
  submitted: boolean = false;
  loading: boolean = false; // à gérer si chargement long
  router!: Router;
  repas = "matin";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private stMvtService: StMvtService,
    private sortieService: SortieService,
    private location: Location    
  ) {}

  ngOnInit(): void {
    this.getSortie();
    this.sortieForm = this.formBuilder.group({
      prixUnit: ['0', ], //Validators.pattern("^[0-9]") ne valide pas!!
      qteMouvement: ['0',Validators.pattern("^[0-9]")],
      article: ['', Validators.required],
      repas: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getSortie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.stMvtService.getSortie(id)
      .subscribe(sortie => {
        this.sortie = sortie;
        this.sortieForm.patchValue({
          article: this.sortie.article,
          qteMouvement: -1 * this.sortie.qteMouvement,
          prixUnit: this.sortie.prixUnit,
          repas: this.sortie.repas,
        })
        
      this.repas = this.sortie.repas;
      });
  }

  onRepasChange(newrepas: any) {
    this.sortieForm.patchValue({
      repas: newrepas,
    })
  }

  goBack(): void {
    this.location.back();
  }

 //zz
  save(): void {
    if (this.sortie) {
      this.stMvtService.updateMvt(this.sortie).subscribe(() => this.goBack());
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.sortieForm.controls; }

  onSubmit() {
      this.submitted = true;
      //const formValue = this.sortieForm.value;
      const newSortie = this.sortie
      /*new Mouvement(
        formValue['article'],
        formValue['qteMouvement'],
        formValue['prixUnit'],
        formValue['repas']
      );*/
      this.sortieService.addSortie(newSortie)
      this.router.navigate(['/sorties'])
  } 
}