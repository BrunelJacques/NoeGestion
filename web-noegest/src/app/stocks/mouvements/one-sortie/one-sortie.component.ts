import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Mouvement } from '../../_models/mouvement';
import { Article } from '../../_models/article';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../../_services/mvt.service';
import { ParamsService } from '../../_services/params.service';
import { Camp, Params, FormField } from '../../_models/params';
import { AlertService } from 'src/app/general/_services';
import { SeeyouService } from 'src/app/shared/_services';
import { Constantes } from 'src/app/constantes';
import { ActivatedRoute } from '@angular/router';
import { IsNull } from 'src/app/general/_helpers/fonctions-perso';

@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
})

export class OneSortieComponent implements OnInit, OnDestroy {
  article$!: Observable<Article[]>;
  id!: string|null;
  article: Article={id:null,nom:null,rations:0};
  mvt?: Mouvement;
  params!: Params;
  camps!: Camp[];
  fg!:FormGroup;
  fg2!: FormGroup;

  onSubmitSubscrib!:Subscription;
  onGoBackSubscrib!:Subscription;
  paramsSubscrib!:Subscription;
  mvtSubscrib!:Subscription;
  receivedData: unknown;

  lstService = Constantes.LSTSERVICE;
  lstService_libelle = this.lstService.map((x) => x.libelle)
  submitted = false;

  fieldsParams: FormField[] = [
    { label: 'jour', type: 'date', value: '__ /__ /____' },
    { label: 'vers', type: 'text', value: '-' },
  ];
  fields: FormField[] = [
    { label: 'service', type: 'select', 
      options: this.lstService_libelle },
    { label: 'prixUnit', type: 'number'},
    { label: 'qte', type: 'number' },
    { label: 'nbRations', type: 'number' },
    { label: 'cout Ration', type: 'label' },
    { label: 'qteStock', type: 'label' },
  ];

  constructor(
    private paramsService: ParamsService,
    private seeyouService: SeeyouService,
    private fb:FormBuilder,
    private fb2:FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mvtService: MvtService,
    ) {
      
    }

  isNull = IsNull

  ngOnInit(): void {
    console.log('bonjour onesortie')
    this.onSeeYou()
    this.id = this.route.snapshot.paramMap.get('id'),

    this.fg = this.fb.group({});
    this.fieldsParams.forEach(field => {
      this.fg.addControl(field.label, this.fb.control(field.value));
    });

    this.fg2 = this.fb2.group({});
    this.fields.forEach(field => {
      this.fg2.addControl(field.label,this.fb2.control(field.value));
      this.fg2.get(field.label)?.setValidators([Validators.required,])
    });
            
    this.getParams();
    this.onSubmitSubscrib = this.seeyouService.onSubmitEvent
    .subscribe((data) => {
      this.receivedData = data
      console.log('onSubmitEvent received in on-sortie:click :', data);
      this.onSubmit();
    })
    this.onGoBackSubscrib = this.seeyouService.onGoBackEvent
    .subscribe((data) => {
      this.receivedData = data
      this.onSubmit();
    })
  }

  ngOnDestroy(): void {
    this.onSubmitSubscrib.unsubscribe()
    this.onGoBackSubscrib.unsubscribe()
    if (this.mvtSubscrib)
      {this.mvtSubscrib.unsubscribe()}
    if (this.paramsSubscrib)
      {this.paramsSubscrib.unsubscribe()}
  }

  // convenience getter for easy access to form fields
  get f() { return this.fg.controls; }
  get f2() { return this.fg2.controls; }

  goBack(): void {
    this.seeyouService.goBackUrlParent()
  }

  onSubmit(){
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.fg.invalid) {
      return;
    }
    this.save()
    this.goBack()
  }

  getMvt(): void {
    if (this.id === null){
      console.log('this.id : ', this.id)
    } else {
      const id = this.id || ''
      this.mvtSubscrib = this.mvtService.getMvt(id)
      .subscribe(mvt => this.mvt = mvt);
    }
  }

  getParams(): void {
    this.paramsSubscrib = this.paramsService.paramssubj$
    .subscribe({
      next: (data:Params) => {
        this.params = data;
        if (!this.params.service || this.params.service < 0){
          this.params.service = 0 }
        this.fg.patchValue({
          'jour': this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
          'vers': this.params.origine,
        })
      },
      error: (e) => {
        if (e != 'Not Found') {
          console.error(e)
        }
      }
    });
  }


  // stocke l'url actuelle pour un prochain retour par onGoBack
  onSeeYou(): void {
    this.seeyouService.setUrlParent()
    this.seeyouService.setModeLancement("")
  }

  save(): void {
    if (this.id ) {
      console.log('à faire save')
      //this.mvtService.updateMvt(this.id.toString())
    }
  }
}
