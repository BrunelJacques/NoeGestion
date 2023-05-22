import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../_services/mvt.service';
import { ParamsService } from '../_services/params.service';
import { Camp } from '../_models/camp';
import { Params } from '../_models/params';
import { first } from 'rxjs';
import { AlertService } from '@app/general/_services';
import { DatePipe } from '@angular/common';
import { Constantes } from '@app/constantes';


@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
  styleUrls: ['./one-sortie.component.less']
})

export class OneSortieComponent implements OnInit {
  mvt: Mouvement | undefined;
  id = 0;
  form!: UntypedFormGroup;
  pipe = new DatePipe('en-US');
  today = new Date();
  constantes = Constantes;
  lstservice = this.constantes.LSTSERVICE;
  lstorigine = this.constantes.LSTORIGINE_SORTIES;
  lstservice_code = this.lstservice.map((x) => x.code)
  params = new Params;
  lstparams: Params[] = [];
  loading = true;
  submitted = false;


  constructor(
    private route: ActivatedRoute,
    private mvtService: MvtService,
    private paramsService: ParamsService,
    private formBuilder: UntypedFormBuilder,
    private location: Location,

    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.form = this.formBuilder.group({
      jour: [this.today.toISOString().split("T")[0],Validators.required],
      origine: ["", Validators.required],
      camp: ["", Validators.required],
      tva: "",
      service: ["", Validators.required],
      fournisseur:"",
      //parent:['', Validators.required],
    });
  }

  onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid    
    if (this.form.invalid) {
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
          if (!this.params.service || this.params.service < 0){ 
            this.params.service = 0 }
          this.form.patchValue({
            'jour': this.params.jour.toISOString().split("T")[0],
            'origine': this.params.origine,
            'camp': this.params.camp,
            'service': this.lstservice[this.params.service].code,
          })
          this.loading = false
        },        
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }


  okBack(): void {
    //this.params.jour = new Date(this.form.value.jour),
    //this.params.origine = this.form.value.origine,
    //this.params.modif = new Date(),
    //this.setParams(),
    this.goBack()
  }


  goBack(): void {
    this.location.back();
  }

  
  getMvt(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.mvtService.getMvt(id)
      .subscribe(mvt => this.mvt = mvt);
  }


  save(): void {
    if (this.id) {
      this.mvtService.updateMvt(this.id)
        .subscribe(() => this.goBack());
    }
  }
}

