import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject,takeUntil } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ParamsService } from '../_services/params.service';
import { Camp, Fournisseur } from '../_models/params';
import { Params } from '../_models/params';

import { AlertService, SeeyouService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
})

export class ParamsComponent implements OnInit, OnDestroy {
  name = "Params";
  parentName!:string;
  params!: Params;
  camps!: Camp[];
  paramsForm!:FormGroup;
  
  private destroy$!: Subject<boolean>;

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
    private seeyouService: SeeyouService,
    ){
      this.initSubscriptions()
    }

  initSubscriptions() {
    this.destroy$ = new Subject<boolean>()
    this.seeyouService.clicksOk$
      .pipe( takeUntil(this.destroy$))
      .subscribe(() => this.onSubmit());
    this.seeyouService.clicksQuit$
      .pipe( takeUntil(this.destroy$) )
      .subscribe(() => { this.onQuit() });    
  }
  
  ngOnInit(): void {
    this.parentName = this.seeyouService.getParentName()
    this.initForm()
    this.getParams()
    this.getCamps()
  }

  initForm(): void {
    this.paramsForm = this.formBuilder.group({
      jour: [new Date(),Validators.required],
      origine:"repas",
      camp: ["00", Validators.required],
      tva: "en TTC",
      service: ["-", Validators.required],
      fournisseur:"",
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

  // convenience getter for easy access to form fields
  get f() { return this.paramsForm.controls; }

  onQuit(): void {
    this.seeyouService.goBack()
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
    this.onQuit()
  }
  
  getCamps(): void {
    this.paramsService.campsSubj$
      .subscribe({
        next: (data:Camp[]) => {
          this.camps = data;
        },        
        error: (e) => {
          if (e != 'Camps Not Found') {
            console.error(e)
          }
        }
      });
      
    }
  
  getParams(): void {
    this.loading = true;
    this.paramsService.paramsSubj$
      .subscribe({
        next: (data:Params) => {
          this.params = data;
          this.paramsService.paramsToForm(this.params,this.paramsForm)
          this.lstorigine = this.lstorigine_sorties
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
  }

}

