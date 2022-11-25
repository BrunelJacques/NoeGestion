import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../_services/mvt.service';
import { Camp } from '../_models/camp';
import { Params } from '../_models/params';
import { first } from 'rxjs';
import { AlertService } from '@app/general/_services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.less'],
})
export class ParamsComponent implements OnInit {
  closeResult = '';
  repas = "";
  origine = "";
  camp = "";
  camps: Camp[] = [];
  paramsForm!: FormGroup;
  pipe = new DatePipe('en-US');
  jour = this.pipe.transform(new Date(), 'yyyy-MM-dd')
  lstrepas = [
    { code: "matin", libelle: "Repas du matin" },
    { code: "midi", libelle: "Repas de midi" },
    { code: "soir", libelle: "Repas du soir" },
    { code: "tout",  libelle: "Pour tout repas" },
  ];
  lstorigine = [
    { code:  "cuisine", libelle: "Repas en cuisine" },
    { code:  "camp", libelle: "Camp Extérieur" },
    { code:  "odIn", libelle: "Régularisation" },
    { code:  "tout", libelle: "Tout" },
  ]
  params = new Params
  lstparams: Params[] = []
  loading = true

  constructor(
    private mvtService: MvtService,
    private formBuilder: FormBuilder,
    private parent: Location,
    private alertService: AlertService,
  ){}
  
  ngOnInit(): void {
    this.getParams();
    this.getCamps();
    this.paramsForm = this.formBuilder.group({
      jour:new Date,
      origine: "",
      camp: "",
      tva: "",
      repas: "",
      fournisseur:"",
      parent:""
    });
  }

  onOrigineChange(neworigine: any) {
    this.origine = neworigine.target.value
  }

  okBack(): void {
    this.params.jour = new Date(this.paramsForm.value.jour),
    this.params.origine = this.paramsForm.value.origine,
    this.params.camp = this.paramsForm.value.camp,
    this.params.repas = this.paramsForm.value.repas,
    this.params.fournisseur = this.paramsForm.value.fournisseur,
    this.params.parent += '-params',
    this.params.tva = this.paramsForm.value.tva,
    this.params.modif = new Date(),
    this.setParams(),
    this.goBack()
  }

  goBack(): void {
    this.parent.back();
  }

  onSubmitForm(){
    this.okBack()
  }

  getParams(): void {
    this.loading = true;
    this.mvtService.getParams()
      .subscribe({
        next: (data) => {
          this.params = data[0];
          console.log(typeof(this.params.jour))
          this.origine =  this.params.origine
          this.paramsForm.patchValue(this.params)
          this.paramsForm.patchValue({'jour':this.pipe.transform(this.params.jour, 'yyyy-MM-dd')})
          this.loading = false
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

  getCamps(): void {
    this.mvtService.getCamps()
      .subscribe({
        next: (data) => {
          this.camps = data;
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      })
  }
  
  setParams(): void {
    this.mvtService.setParams(this.params)
        .pipe(first())
        .subscribe({
            next: () => {},
            error: error => {
                this.alertService.error(error);
            }
        });
  }

}
