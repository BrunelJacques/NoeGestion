import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Mouvement } from '../../_models/mouvement';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../../_services/mvt.service';
import { ParamsService } from '../../_services/params.service';
import { Camp, Params, FormField } from '../../_models/params';
import { AlertService, SeeyouService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';
import { ActivatedRoute } from '@angular/router';
import { FonctionsPerso } from 'src/app/shared/fonctions-perso';
import { Article } from '../../_models/article';
import { NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';


@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
})

export class OneSortieComponent implements OnInit, OnDestroy {

  private destroy$!: Subject<boolean>
  id!: string;
  mvt!: Mouvement;
  params!: Params;
  camps!: Camp[];
  fgParams!:FormGroup;
  fgMvt!: FormGroup;

  lstService = Constantes.LSTSERVICE;
  lstService_libelle = this.lstService.map((x) => x.libelle)
  submitted = false;

  fieldsParams: FormField[] = [
    { label: 'jour', type: 'date', value: '__ /__ /____' },
    { label: 'vers', type: 'text', value: '-' },
  ];
  fieldsMvt: FormField[] = [
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
    private fbParams:FormBuilder,
    private fbMvt:FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mvtService: MvtService,
    private fp: FonctionsPerso,
    ) {}

  // convenience getter for easy access to form fieldsMvt
  get f() { return this.fgParams.controls; }

  isNull = this.fp.isNull

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {this.id = id}
    this.initSubscriptions()

    this.initForm()
    this.getParams()
    this.getMvt(this.id)
  }

  initForm() {
    this.fgParams = this.fbParams.group({});
    this.fieldsParams.forEach(field => {
      this.fgParams.addControl(field.label, this.fbParams.control(field.value));
    });

    this.fgMvt = this.fbMvt.group({});
    this.fieldsMvt.forEach(field => {
      this.fgMvt.addControl(field.label,this.fbMvt.control(field.value));
      this.fgMvt.get(field.label)?.setValidators([Validators.required,])
    });
  }

  numToString(nombre:number|undefined,nbDecimales?:number): string {
    if (!nbDecimales) {nbDecimales = 2}
    if (typeof(nombre) === 'number') {
        return nombre.toFixed(nbDecimales)
      } else {return " "}
  }

  formatNumber(value: number | undefined): string {
    if (typeof value === 'number') {
      return value.toFixed(2);
    } else {
      return ' ';
    }
  }

  setValuesMvt(mvt:Mouvement) {
    let coutRation
    if (typeof mvt.nbrations === 'number' && mvt.nbrations > 0) {
      coutRation = Math.round(mvt.prixunit * mvt.qtemouvement / mvt.nbrations ).toFixed(2)
    } else {coutRation = undefined}
    this.fgMvt.patchValue({
      'service': mvt.service,
      'prixUnit': mvt.prixunit,
      'qte': - mvt.qtemouvement,
      'nbRations': mvt.nbrations,
      'cout Ration': coutRation,
      'qteStock': mvt.article.qte_stock
    })
    console.log('import mouvement :',mvt,  )
  }

  initSubscriptions() {
    this.destroy$ = new Subject<boolean>()

    this.seeyouService.clicksOk$
      .pipe( takeUntil(this.destroy$) ) 
      .subscribe(() => {
      this.onSubmit();
      });

    this.seeyouService.clicksQuit$
      .pipe( takeUntil(this.destroy$) )
      .subscribe(() => {
      this.onQuit();
    });    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

  onQuit(): void {
    this.seeyouService.goBack()
  }

  onSubmit(){
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.fgParams.invalid) {
      console.log('one-sortie onSubmit invalide')
      return;
    }
    this.save()
    this.onQuit()
  }

  getMvt(id:string): void {
    this.mvtService.getMvt(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (mvt:Mouvement) => {
          this.mvt=mvt,
          this.setValuesMvt(mvt)
        },
        error: (e) =>{ if (e != 'Not Found') { console.error('one-sortie.getMvt',e)}}
      });
  } 

  getParams(): void {
    this.paramsService.paramssubj$
      .pipe( takeUntil(this.destroy$))
      .subscribe({
        next: (data:Params) => {
          this.params = data;
          if (!this.params.service || this.params.service < 0){
            this.params.service = 0 }
          this.fgParams.patchValue({
            'jour': this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
            'vers': this.params.origine,
          })
        },
        error: (e) => {
          if (e != 'Not Found') { console.error('one-sortie.getParams',e)}
        }
      })
  }

  onArticle(retour: Article): void {
    console.log('event article: ',retour)
  }

  save(): void {
    if (this.id ) {
      console.log('à faire save')
      //this.mvtService.updateMvt(this.id.toString())
    }
  }
}
