import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ParamsService } from '../_services/params.service';
import { Camp, Fournisseur } from '../_models/params';
import { Params } from '../_models/params';

import { AlertService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';
import { UrlService } from 'src/app/general/_services';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.less'],
})

export class ParamsComponent implements OnInit {
  params!: Params;
  lstcamps!: Camp[];
  paramsForm!:FormGroup;
  parent = "";


  constantes = Constantes;
  lstservice = this.constantes.LSTSERVICE;
  lstorigine_sorties = this.constantes.LSTORIGINE_SORTIES;
  lstorigine_entrees = this.constantes.LSTORIGINE_ENTREES;
  lstorigine = this.lstorigine_entrees;

  fournisseurs!: Fournisseur[];

  lstservice_code = this.lstservice.map((x) => x.code)
  loading = true;
  submitted = false;

  
  constructor(
    private paramsService: ParamsService,
    private formBuilder: FormBuilder,
    private location: Location,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private urlService: UrlService,
  ){}
  
  ngOnInit(): void {
    //this.paramsService.paramssubj$.subscribe( params => this.params = params );
    this.paramsForm = this.formBuilder.group({
      jour: [new Date(),Validators.required],
      origine:"repas",
      camp: ["00", Validators.required],
      tva: "en TTC",
      service: ["-", Validators.required],
      fournisseur:"",
    });
    this.getParams()
    this.getCamps()
    this.parent = this.urlService.getParentName()
  }

  // convenience getter for easy access to form fields
  get f() { return this.paramsForm.controls; }

  getParams(): void {
    this.loading = true;
    this.paramsService.paramssubj$
      .subscribe({
        next: (data:Params) => {
          this.params = data;
          if (!this.params.service || this.params.service < 0){ 
            this.params.service = 0 }
          this.paramsForm.patchValue({
            'jour': this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
            'origine': this.params.origine,
            'camp': this.params.camp,
            'tva': this.params.tva,
            'service': this.lstservice[this.params.service].code,
            'fournisseur': this.params.fournisseur,
          })
          //if (this.params.parent.endsWith('sorties')) {
          this.lstorigine = this.lstorigine_sorties
          //  } else {this.lstorigine = this.lstorigine_entrees}    
          this.loading = false
          this.majOrigine(this.params.origine)
        },        
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
    this.fournisseurs = this.paramsService.fournisseurs
    console.log(this.fournisseurs)
  }

  onOrigineChange() {
      this.majOrigine(this.f['origine'].value)
    }

  majOrigine(origine: string){
    if (origine.endsWith("camp"))
    { (this.paramsForm).get("camp")?.enable()
      this.getCamps()
    } 
    else {this.paramsForm.get("camp")?.disable()}

    if (origine.endsWith("repas"))
    { this.paramsForm.get("service")?.enable()} 
    else {
      this.paramsForm.patchValue({"service":""})
      this.paramsForm.get("service")?.disable()
    }
  }

  okBack(): void {
    this.params.jour = new Date(this.paramsForm.value.jour),
    this.params.origine = this.paramsForm.value.origine,
    this.params.camp = this.paramsForm.value.camp,
    this.params.service = this.lstservice_code.indexOf(this.paramsForm.value.service),
    this.params.fournisseur = this.paramsForm.value.fournisseur,
    this.params.parent += '-params',
    this.params.tva = this.paramsForm.value.tva,
    this.params.modif = new Date(),
    this.setParams(this.params),
    this.goBack()
  }

  goBack(): void {
    this.location.back();
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

  getCamps(): void {
    this.paramsService.getCamps()
    this.lstcamps = this.paramsService.camps
    console.log('camps: ',this.lstcamps)
    }
  
  setParams(params: Params): void {
    this.paramsService.setParams(params)
  }
}
