import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Mouvement } from 'src/app/models/stmouvement';
import { StMvtService } from 'src/app/services/stmvt.service';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})

export class SortieComponent implements OnInit {
  sortie!: Mouvement;
  sortieForm!: FormGroup;
  returnUrl!: string;
  submitted: boolean = false;
  loading: boolean = false;
  router!: Router;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private stMvtService: StMvtService,
    private location: Location    
  ) {}

  ngOnInit(): void {
    this.getSortie()
    this.sortieForm = this.formBuilder.group({
      prixUnit: ['', Validators.required,Validators.pattern("^[0-9]")],
      qteMouvement: ['',Validators.pattern("^[0-9]")],
      article: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  getSortie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.stMvtService.getSortie(id)
      .subscribe(sortie => this.sortie = sortie);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.sortie) {
      this.stMvtService.updateMvt(this.sortie).subscribe(() => this.goBack());
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.sortieForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.sortieForm.invalid) {
          return;
      }

      this.loading = true;
  } 

}