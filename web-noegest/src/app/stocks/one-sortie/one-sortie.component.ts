import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../_services/mvt.service';
import { ParamsService } from '../_services/params.service';
import { Params } from '../_models/params';
import { AlertService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';


@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
  styleUrls: ['./one-sortie.component.less']
})

export class OneSortieComponent implements OnInit {
  mvt: Mouvement | undefined;
  id: string|null = "";
  form!: UntypedFormGroup;
  today = new Date();
  constantes = Constantes;
  lstservice = this.constantes.LSTSERVICE;
  lstorigine = this.constantes.LSTORIGINE_SORTIES;
  lstservice_code = this.lstservice.map((x) => x.code)
  params!: Params;
  lstparams: Params[] = [];
  loading = true;
  submitted = false;


  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mvtService: MvtService,
    private paramsService: ParamsService,
    private formBuilder: UntypedFormBuilder,
    private location: Location,

    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'),
    this.form = this.formBuilder.group({
      jour: [new Date(),Validators.required],
      origine: ["repas", Validators.required],
      fournisseur:"",
    });
    this.getParams();
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

  getMvt(): void {
    if (this.id === null){
      console.log('this.id : ', this.id)
    }{
      const id = this.id || ''
      this.mvtService.getMvt(id)
      .subscribe(mvt => this.mvt = mvt);
    }
  }

  getParams(): void {
    this.loading = true;
    this.paramsService.paramssubj$
      .subscribe({
        next: (data:Params) => {
          this.params = data;
          if (!this.params.service || this.params.service < 0){ 
            this.params.service = 0 }
          this.form.patchValue({
            'jour': this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
            'origine': this.params.origine,
            'camp': this.params.camp,
            'tva': this.params.tva,
            'service': this.lstservice[this.params.service].code,
            'fournisseur': this.params.fournisseur,
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
  
  save(): void {
    if (this.id) {
      this.mvtService.updateMvt(this.id.toString())
        .subscribe(() => this.goBack());
    }
  }
}
