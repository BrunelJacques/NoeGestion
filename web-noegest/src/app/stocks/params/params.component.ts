import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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
  service = "";
  origine = "";
  camp = "";
  camps: Camp[] = [];
  paramsForm!: UntypedFormGroup;
  pipe = new DatePipe('en-US');
  today = new Date();
  lstservice = [
    { code: "matin", libelle: "Service du matin" },
    { code: "midi", libelle: "Service de midi" },
    { code: "soir", libelle: "Service du soir" },
    { code: "tous",  libelle: "Autre ou tout service" },
  ];

  lstorigine = [];

  lstorigine_sorties = [
    { code:  "repas", libelle: "Repas en cuisine" },
    { code:  "camp", libelle: "Camp Extérieur" },
    { code:  "od_out", libelle: "Régularisation" },
    { code:  "tout", libelle: "Toute ligne (ss filtre)" },
  ];
  lstorigine_entrees = [
    { code:  "achat", libelle: "Achats fournisseur" },
    { code:  "retour", libelle: "Retour de camp" },
    { code:  "od_in", libelle: "Régularisation" },
    { code:  "tout", libelle: "Toute ligne (ss filtre)" },
  ];

  params = new Params;
  lstparams: Params[] = [];
  loading = true;
  submitted = false;


  constructor(
    private mvtService: MvtService,
    private formBuilder: UntypedFormBuilder,
    private parent: Location,
    private alertService: AlertService,
  ){}
  
  ngOnInit(): void {
    this.getParams();
    this.getCamps();
    this.paramsForm = this.formBuilder.group({
      jour: [this.today.toISOString().split("T")[0],Validators.required],
      origine: ["", Validators.required],
      camp: ["", Validators.required],
      tva: "",
      service: ["", Validators.required],
      fournisseur:"",
      //parent:['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.paramsForm.controls; }


  onOrigineChange(neworigine: any) {
    this.origine = neworigine.target.value
    this.majOrigine(this.origine)
  }

  majOrigine(origine){
    if (origine.endsWith("camp"))
    { this.paramsForm.get("camp").enable()} 
    else {this.paramsForm.get("camp").disable()}

    if (origine.endsWith("repas"))
    { this.paramsForm.get("service").enable()} 
    else {
      this.paramsForm.patchValue({"service":""})
      this.paramsForm.get("service").disable()
    }
  }

  okBack(): void {
    this.params.jour = new Date(this.paramsForm.value.jour),
    this.params.origine = this.paramsForm.value.origine,
    this.params.camp = this.paramsForm.value.camp,
    this.params.service = this.paramsForm.value.service,
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

  onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid    
    if (this.paramsForm.invalid) {
        return;
    }
    this.loading = true;
    this.okBack()
  }

  getParams(): void {
    this.loading = true;
    this.mvtService.getParams()
      .subscribe({
        next: (data) => {
          this.params = data[0];
          this.params.jour = new Date(this.params.jour) //reprise du type date pour toISOString
          this.origine =  this.params.origine
          //this.paramsForm.patchValue({'jour':this.pipe.transform(this.params.jour, 'yyyy-MM-dd')})
          this.paramsForm.patchValue({
            'jour': this.params.jour.toISOString().split("T")[0],
            'origine': this.params.origine,
            'camp': this.params.camp,
            'tva': this.params.tva,
            'service': this.params.service,
            'fournisseur':this.params.fournisseur,
          })
          if (this.params.parent == 'sorties') 
            {this.lstorigine = this.lstorigine_sorties}
          else {this.lstorigine = this.lstorigine_entrees}    
          this.loading = false
          this.majOrigine(this.origine)
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
