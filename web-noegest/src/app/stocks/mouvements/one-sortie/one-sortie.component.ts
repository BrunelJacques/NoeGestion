import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Mouvement } from '../../_models/mouvement';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../../_services/mvt.service';
import { Camp, FormField, Params } from '../../_models/params';
import { AlertService, SeeyouService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';
import { ActivatedRoute } from '@angular/router';
import { FonctionsPerso } from 'src/app/shared/fonctions-perso';
import { Article } from '../../_models/article';
import { ParamsService } from '../../_services/params.service';

@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
  styleUrls: ['./one-sortie.component.scss']
})

export class OneSortieComponent implements OnInit, OnDestroy {

  private destroy$!: Subject<boolean>;
  paramsSubscrib!:Subscription;
  params!: Params;
  jour: string | null = ""

  id!: string;
  mvt!: Mouvement;
  camps!: Camp[];
  fgMvt!: FormGroup;
  fgPar!: FormGroup;

  lstService = Constantes.LSTSERVICE;
  lstService_libelle = this.lstService.map((x) => x.libelle)
  submitted = false;

  fieldsMvt: FormField[] = [
    { label: 'jour', type: 'text'},
    { label: 'vers', type: 'text'},
    { label: 'service', type: 'select',
      options: this.lstService_libelle },
    { label: 'prixUnit', type: 'number'},
    { label: 'qte', type: 'number' },
    { label: 'nbRations', type: 'number' },
    { label: 'coutRation', type: 'number' },
    { label: 'qteStock', type: 'number' },
  ];

  constructor(
    private seeyouService: SeeyouService,
    private paramsService: ParamsService,
    private fbMvt:FormBuilder,
    private fbPar:FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mvtService: MvtService,
    private fxPerso: FonctionsPerso,
    ) {}

  // convenience getter for easy access to form fieldsMvt
  get f() { return this.fgMvt.controls; }
  get fPar() { return this.fgPar.controls; }

  isNull = this.fxPerso.isNull

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {this.id = id}
    this.initSubscriptions(this.id)
    this.initForm()
  }

  initForm() {
    this.fgMvt = this.fbMvt.group({});
    this.fieldsMvt.forEach(field => {
      this.fgMvt.addControl(field.label,this.fbMvt.control(field.value));
      this.fgMvt.get(field.label)?.setValidators([Validators.required,])
    });
    const jj =  this.datePipe.transform(this.params.jour, 'yyyy-MM-dd')
    this.fgPar = this.fbPar.group({
      jour: [jj,Validators.required],
      vers:this.params.origine,
    });
  }

  setValuesMvt(mvt:Mouvement) {
    const qteParRation = mvt.sens * this.fxPerso.division(mvt.qtemouvement, mvt.nbrations ) 
    const coutRation = this.fxPerso.round( mvt.prixunit * qteParRation)
    this.fgMvt.patchValue({
      'jour': this.datePipe.transform(mvt.jour, 'dd/MM/yyyy'),
      'vers': mvt.origine,
      'service': this.lstService_libelle[mvt.service],
      'prixUnit': this.fxPerso.round(mvt.prixunit,4),
      'qte': mvt.qtemouvement * mvt.qtemouvement,
      'nbRations': mvt.nbrations,
      'coutRation': coutRation,
      'qteStock': mvt.article.qte_stock
    })
  }

  initSubscriptions(id:string): void {
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

    this.paramsSubscrib = this.paramsService.paramssubj$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Params) => {
          if ( data ) {
            this.params = data;
          }
        },
        error: (e: string) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
    });

    this.mvtService.getMvt(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (mvt:Mouvement) => {
          this.mvt = mvt
          if (this.mvt ) {
            this.setValuesMvt(mvt)
          }
        },
        error: (e) =>{ if (e != 'Not Found') { console.error('one-sortie.getMvt',e)}}
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

  onQuit(): void {
    console.log('fin onesortie: ', this.fgMvt.value)
    this.seeyouService.goBack()
  }

  onSubmit(){
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.fgMvt.invalid) {
      console.log('one-sortie onSubmit invalide')
      return;
    }
    this.save()
    this.onQuit()
  }

  onArticle(retour: Article): void {
    console.log('event article: ',retour)
  }

  onDateChange($event: undefined) {
    console.log($event);
  }
  
  save(): void {
    if (this.id ) {
      console.log('à faire save')
      //this.mvtService.updateMvt(this.id.toString())
    }
  }
}
