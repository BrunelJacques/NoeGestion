import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
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


@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
})

export class OneSortieComponent implements OnInit, OnDestroy {

  private destroy$!: Subject<boolean>
  id!: string;
  mvtSubscription!: Subscription
  mvt!: Mouvement;
  params!: Params;
  camps!: Camp[];
  fg!:FormGroup;
  fg2!: FormGroup;

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
    private fp: FonctionsPerso,
    ) {}

  // convenience getter for easy access to form fields
  get f() { return this.fg.controls; }
  get f2() { return this.fg2.controls; }

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
    this.fg = this.fb.group({});
    this.fieldsParams.forEach(field => {
      this.fg.addControl(field.label, this.fb.control(field.value));
    });

    this.fg2 = this.fb2.group({});
    this.fields.forEach(field => {
      this.fg2.addControl(field.label,this.fb2.control(field.value));
      this.fg2.get(field.label)?.setValidators([Validators.required,])
    });
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
    if (this.fg.invalid) {
      console.log('one-sortie onSubmit invalide')
      return;
    }
    this.save()
    this.onQuit()
  }

  getMvt(id:string): void {
    this.mvtService.getMvt(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(mvt => this.mvt=mvt);
  } 

  getParams(): void {
    this.paramsService.paramssubj$
      .pipe( takeUntil(this.destroy$))
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
      })
  }

  save(): void {
    if (this.id ) {
      console.log('à faire save')
      //this.mvtService.updateMvt(this.id.toString())
    }
  }
}
