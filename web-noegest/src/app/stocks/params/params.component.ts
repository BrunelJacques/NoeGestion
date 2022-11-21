import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MvtService } from '../_services/mvt.service';
import { Camp } from '../_models/camp';
import { Params } from '../_models/params';
import { first } from 'rxjs';
import { AlertService } from '@app/general/_services';
import { stringify } from 'querystring';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.less'],
  providers: [DatePipe,]
})
export class ParamsComponent implements OnInit {
  closeResult = '';
  repas = "";
  origine = "";
  camp = "";
  camps: Camp[] = [];
  paramsForm!: FormGroup;
  jour = ""
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
  pipe = new DatePipe('en-US');
  params = new Params
  lstparams: Params[] = []
  loading = true

  constructor(
    private mvtService: MvtService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private location: Location,
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
    });
  }

  onOrigineChange(neworigine: any) {
    this.origine = neworigine.target.value
    console.log(this.origine)
  }

  okBack(): void {
    this.params.jour = new Date(this.paramsForm.value.jour),
    this.params.origine = this.paramsForm.value.origine,
    this.params.camp = this.paramsForm.value.camp,
    this.params.tva = this.paramsForm.value.tva,
    this.params.repas = this.paramsForm.value.repas
    this.setParams()
    this.goBack()
  }

  goBack(): void {
    this.location.back();
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
          this.paramsForm.patchValue(this.params)
          this.paramsForm.patchValue({origine: "cuisine"})
          this.origine = "cuisine"
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
    this.mvtService.setParams(this.paramsForm.value)
        .pipe(first())
        .subscribe({
            next: () => {},
            error: error => {
                this.alertService.error(error);
            }
        });
  }

}
