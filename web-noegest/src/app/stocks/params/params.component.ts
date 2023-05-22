import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../_services/mvt.service';
import { ParamsService } from '../_services/params.service';
import { Camp } from '../_models/camp';
import { Params } from '../_models/params';
import { first } from 'rxjs';
import { AlertService } from '@app/general/_services/alert.service';
import { DatePipe } from '@angular/common';
import { Constantes } from '@app/constantes';


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

  constantes = Constantes
  lstservice = this.constantes.LSTSERVICE;
  lstorigine = [];
  lstorigine_sorties = this.constantes.LSTORIGINE_SORTIES;
  lstorigine_entrees = this.constantes.LSTORIGINE_ENTREES;

  lstservice_code = this.lstservice.map((x) => x.code)
  params = new Params;
  lstparams: Params[] = [];
  loading = true;
  submitted = false;


  constructor(
    private mvtService: MvtService,
    private paramsService: ParamsService,
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
    this.params.service = this.lstservice_code.indexOf(this.paramsForm.value.service),
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
    this.paramsService.getParams()
      .subscribe({
        next: (data) => {
          this.params = data[0];
          this.params.jour = new Date(this.params.jour) //reprise du type date pour toISOString
          this.origine =  this.params.origine
          //this.paramsForm.patchValue({'jour':this.pipe.transform(this.params.jour, 'yyyy-MM-dd')})
          if (!this.params.service || this.params.service < 0){ 
            this.params.service = 0 }
          this.paramsForm.patchValue({
            'jour': this.params.jour.toISOString().split("T")[0],
            'origine': this.params.origine,
            'camp': this.params.camp,
            'tva': this.params.tva,
            'service': this.lstservice[this.params.service].code,
            'fournisseur': this.params.fournisseur,
          })
          if (this.params.parent.endsWith('sorties')) 
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
    this.paramsService.setParams(this.params)
  }

}
