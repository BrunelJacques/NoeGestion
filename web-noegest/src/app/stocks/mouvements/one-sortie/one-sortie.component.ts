import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Mouvement, MVT0, MvtsRetour } from '../../_models/mouvement';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MvtService } from '../../_services/mvt.service';
import { Camp, FormField, Params } from '../../_models/params';
import { AlertService, SeeyouService } from 'src/app/general/_services';
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

  id!: string;
  mvt!: Mouvement;
  camps!: Camp[];
  lstCamps_lib!:string[]
  fgMvt!: FormGroup;
  fgPar!: FormGroup;
  fieldsMvt: FormField[] = []
  submitted = false;
  showCamp = false
  showService = true

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
    this.initSubscriptForm()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete();
  }

  initForm() {
    this.fieldsMvt= [
      { label: 'Jour', type: 'date'},
      { label: 'Vers', type: 'select',
          options: this.mvtService.lstOrigine_lib.slice(0,-1)},
      { label: 'Camp', type: 'select',
          options: this.lstCamps_lib},
      { label: 'Service', type: 'select',
          options: this.mvtService.lstService_libelle },
      { label: 'PrixUnit', type: 'number'},
      { label: 'Qte', type: 'number' },
      { label: 'TotRations', type: 'number' },
      { label: 'CoutRation', type: 'number' },
      { label: 'QteStock', type: 'number' },
    ];

    // form Filtres actifs (params)
    this.fgPar = this.fbPar.group({
      jour: this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
      origine:this.params.origine,
      camp:this.params.camp,
    });
    this.fgPar.addControl("camp",this.fbPar.control(this.params.camp));
    this.fgPar.disable();

    // form de saisie de l'enregistrement
    this.fgMvt = this.fbMvt.group({});
    this.fieldsMvt.forEach(field => {
      this.fgMvt.addControl(field.label,this.fbMvt.control(field.value));
      this.fgMvt.get(field.label)?.setValidators([Validators.required,])
    });
  }

  setValuesMvt(mvt:Mouvement) {
    this.mvtService.mvtToForm(mvt,this.fgMvt)
  }

  initSubscriptions(id:string): void {
    this.destroy$ = new Subject<boolean>()

    // gestion des navigation et retours
    this.seeyouService.clicksOk$
      .pipe( takeUntil(this.destroy$))
      .subscribe(() => {
      this.onSubmit();
      });

    this.seeyouService.clicksQuit$
      .pipe( takeUntil(this.destroy$))
      .subscribe(() => {
      this.onQuit();
    });

    // getParams
    this.paramsSubscrib = this.paramsService.paramsSubj$
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

    // Call getMvt
    if (id !='0') {
      this.mvtService.getMvt(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (mvts: MvtsRetour) => {
            const mvt = mvts.results[0] || { ...MVT0 };
            if (!this.mvt && mvt === MVT0 && this.params.jour) {
              const jj = this.params.jour;
              const origine = this.params.origine;
              if (jj) {
                mvt.jour = jj;
                mvt.origine = origine;
              }
            }
            this.mvt = mvt;
            this.setValuesMvt(mvt);
          },
          error: (e) => {
            if (e !== 'Not Found') {
              console.error('one-sortie.getMvt', e);
            }
          }
        }) // fin subscribe
      ; // fin getMvt
    }

    // route data est alimenté par le resolver url avant ouverure
    this.route.data
      .subscribe(x => {
        this.camps = x['camps']
        this.lstCamps_lib = this.camps.map(x => x.nom)
      })
    console.log('one-sortie.camps:',this.camps)
  } // fin de initSubscriptions

  initSubscriptForm() : void {
    this.f['Qte'].valueChanges.subscribe(() => this.onFormChanged());
    this.f['PrixUnit'].valueChanges.subscribe(() => this.onFormChanged());
    this.f['Vers'].valueChanges.subscribe(() => this.onFormChanged());     
  }

  onQuit(): void {
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

  onArticle(article: Article): void {
    if (article != this.mvt.article) {
      console.log('one-sortie onArticle change: ',article)
      this.mvt.article = article
      this.mvt.nbrations =  this.fxPerso.produit(article.rations,this.mvt.qtemouvement)
      this.mvt.prixunit = article.prix_moyen ? article.prix_moyen : 0.0
      this.setValuesMvt(this.mvt)  
    }
  }

  onFormChanged(){
    this.mvt.qtemouvement = this.fgMvt.get('Qte')?.value;
    const vers = this.fgMvt.get('Vers')?.value;
    if (vers == 'Camp Extérieur') { this.showCamp = true
    } else {this.showCamp = false}
    if (vers == 'Repas en cuisine') { this.showService = true
    } else {this.showService = false}
    console.log('showService: ',vers ,this.showService)
  }

  save(): void {
    if (this.id ) {
      const updatedMvt:Mouvement = this.mvt
      //this.mvtService.putMvt(this.id.toString())
      this.mvtService.putMvt(this.id, updatedMvt).subscribe({
        next: (updated) => {
          if (updated) {
            console.log('Movement updated successfully', updated);
          } else {
            console.log('Movement update failed or no changes');
          }
        },
        error: (e) => console.error('Error updating movement', e)
      });
    }
  }
}
