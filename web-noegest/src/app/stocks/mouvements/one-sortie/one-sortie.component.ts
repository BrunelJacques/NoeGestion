import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mouvement } from '../../_models/mouvement';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../../_services/mvt.service';
import { ParamsService } from '../../_services/params.service';
import { Camp, Params, FormField } from '../../_models/params';
import { AlertService, SharedService } from 'src/app/general/_services';
import { Constantes } from 'src/app/constantes';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-one-sortie',
  templateUrl: './one-sortie.component.html',
})

export class OneSortieComponent implements OnInit, OnDestroy {
  id!: string|null;
  mvt?: Mouvement;
  params!: Params;
  camps!: Camp[];
  fg!:FormGroup;
  fg2!: FormGroup;
  fields: FormField[] = [
    { label: 'Name', type: 'text', value: '' },
    { label: 'BirthDate', type: 'date', value: null },
    { label: 'Age', type: 'number', value: 0 },
    { label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], value: 'Male' },
    { label: 'Name2', type: 'text', value: '' },
    { label: 'BirthDate2', type: 'date', value: null },
    { label: 'Age2', type: 'number', value: 0 },
    { label: 'Gender2', type: 'select', options: ['Male', 'Female', 'Other'], value: 'Male' },
    // Add more fields as needed
  ];

  onSubmitSubscrib!:Subscription;
  onGoBackSubscrib!:Subscription;
  paramsSubscrib!:Subscription;
  mvtSubscrib!:Subscription;
  receivedData: unknown;

  constantes = Constantes;
  lstservice = this.constantes.LSTSERVICE;
  lstorigine_sorties = this.constantes.LSTORIGINE_SORTIES;


  lstservice_code = this.lstservice.map((x) => x.code)
  submitted = false;

  constructor(
    private paramsService: ParamsService,
    private sharedService: SharedService,
    private fb:FormBuilder,
    private fb2:FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mvtService: MvtService
  ){}

  ngOnInit(): void {
    this.fg2 = this.fb2.group({});
    this.fields.forEach(field => {
      this.fg2.addControl(field.label, this.fb2.control(field.value));
    });
    
    this.id = this.route.snapshot.paramMap.get('id'),
    this.fg = this.fb.group({
      jour: [new Date(),Validators.required],
      origine: ["repas", Validators.required],
      analytique: "00",
      service: 0,
      article:"",
      prixUnit:0.0,
      qte: 0.0, 
      nbrRations: 0.0,
    });
    this.getParams();
    this.onSubmitSubscrib = this.sharedService.onSubmitEvent
    .subscribe((data) => {
      this.receivedData = data
      console.log('onSubmitEvent received in on-sortie:click :', data);
      this.onSubmit();
    })
    this.onGoBackSubscrib = this.sharedService.onGoBackEvent
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
    this.sharedService.goBackUrlParent()
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
          'origine': this.params.origine,
          'analytique': this.params.camp,
          'service': this.lstservice[this.params.service].code,
        })
      },
      error: (e) => {
        if (e != 'Not Found') {
          console.error(e)
        }
      }
    });
  }

  save(): void {
    if (this.id ) {
      console.log('à faire save')
      //this.mvtService.updateMvt(this.id.toString())
    }
  }
}
