import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ParamsService } from '../_services/params.service';
import { Camp, Fournisseur } from '../_models/params';
import { Params } from '../_models/params';

import { AlertService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';
import { SharedService } from 'src/app/general/_services';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
})

export class ParamsComponent implements OnInit, OnDestroy {

  params!: Params;
  camps!: Camp[];
  paramsForm!:FormGroup;
  parent = "";

  onSubmitSubscrib!:Subscription;
  onGoBackSubscrib!:Subscription;
  paramsSubscrib!:Subscription;
  receivedData: unknown;

  lstservice = Constantes.LSTSERVICE;
  lstorigine_sorties = Constantes.LSTORIGINE_SORTIES;
  lstorigine_entrees = Constantes.LSTORIGINE_ENTREES;
  lstorigine = this.lstorigine_entrees;

  fournisseurs!: Fournisseur[];

  lstservice_code = this.lstservice.map((x) => x.code)
  loading = true;
  submitted = false;

  
  constructor(
    private paramsService: ParamsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private sharedService: SharedService,
    ){}
  
  ngOnInit(): void {
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
    this.onSubmitSubscrib = this.sharedService.onSubmitEvent
      .subscribe((data) => {
        this.receivedData = data
        console.log('onSubmitEvent received in params:click :', data);
        this.onSubmit();    
      })
    this.onGoBackSubscrib = this.sharedService.onGoBackEvent
      .subscribe((data) => {
      this.receivedData = data
      console.log('onGoBackEvent received in params:click :', data);
      this.onSubmit();    
    })
  }

  ngOnDestroy(): void {
    this.onSubmitSubscrib.unsubscribe() 
    this.onGoBackSubscrib.unsubscribe()   
    if (this.paramsSubscrib){
      this.paramsSubscrib.unsubscribe()
    }  
  }


  // convenience getter for easy access to form fields
  get f() { return this.paramsForm.controls; }

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
  
  goBack(): void {
    this.sharedService.goBackUrlParent()
  }

  onSubmit(){
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid    
    if (this.paramsForm.invalid) { 
      return; 
    }
    this.loading = true,
    this.paramsService.formToParams(this.paramsForm,this.params),
    this.params.modif = new Date(),
    this.paramsService.setParams(this.params)
    this.goBack()
  }
  
  getCamps(): void {
    this.paramsService.getCamps()
    this.camps = this.paramsService.camps
    console.log('camps: ',this.camps)
    }
  
  getParams(): void {
    this.loading = true;
    this.paramsSubscrib = this.paramsService.paramssubj$
      .subscribe({
        next: (data:Params) => {
          this.params = data;
          this.paramsService.paramsToForm(this.params,this.paramsForm)
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

}

