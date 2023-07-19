import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../../_models/mouvement';
import { Location, DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../../_services/mvt.service';
import { ParamsService } from '../../_services/params.service';
import { Camp, Params } from '../../_models/params';
import { AlertService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
  styleUrls: ['./one-sortie.component.less']
})

export class OneSortieComponent implements OnInit {
  id!: string|null;
  mvt?: Mouvement;
  params!: Params;
  camps!: Camp[];
  paramsForm!: UntypedFormGroup;


  constantes = Constantes;
  lstservice = this.constantes.LSTSERVICE;
  lstorigine_sorties = this.constantes.LSTORIGINE_SORTIES;


  lstservice_code = this.lstservice.map((x) => x.code)
  submitted = false;
  form!: UntypedFormGroup;

  constructor(
    private paramsService: ParamsService,
    private formBuilder: UntypedFormBuilder,
    private location: Location,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mvtService: MvtService
  ){}

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
    if (!this.form.invalid) {
      this.okBack()
    }
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
