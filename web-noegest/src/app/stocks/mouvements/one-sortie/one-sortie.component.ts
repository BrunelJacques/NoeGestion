import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
  private formLoaded = false;
  private valuesForm: {[key: string]: unknown } = {};
  private mvtCalled!: Mouvement;
  private mvtOld!: Mouvement;
  
  params!: Params;
  id!: string|null;
  mvt!: Mouvement;
  camps!: Camp[];
  fgMvt!: FormGroup;
  fgPar!: FormGroup;
  fieldsForm: FormField[] = [];
  
  submitted = false;
  showCamp = false
  showService = true

  constructor(
    private seeyouService: SeeyouService,
    private paramsService: ParamsService,
    private mvtService: MvtService,
    private fp: FonctionsPerso,
    private fbMvt:FormBuilder,
    private fbPar:FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    ) {}

  // convenience getter for easy access to form fieldsForm
  get f() { return this.fgMvt.controls; }
  get fPar() { return this.fgPar.controls; }

  isNull = this.fp.isNull

  ngOnInit(): void {
    const id :string|null  = this.route.snapshot.paramMap.get('id')?? null
    this.id = id
    this.initSubscriptions(id)
    this.initForm()
    this.initSubscriptForm()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete();
  }

  initForm(): void {
    this.fieldsForm = this.mvtService.getFieldsForm();
  
    for (const field of this.fieldsForm) {
        this.valuesForm[field.label] = field.value;
    }

    // form Filtres actifs (params)
    this.fgPar = this.fbPar.group({
      jour: this.datePipe.transform(this.params.jour, 'dd/MM/yyyy'),
      origine:this.params.origine,
      camp:this.params.camp,
    });
    this.fgPar.addControl("camp",this.fbPar.control(this.params.camp));
    this.fgPar.disable();

    // form de saisie de l'enregistrement
    this.fgMvt = this.fbMvt.group({});
    this.fieldsForm.forEach(field => {
      this.fgMvt.addControl(field.label,this.fbMvt.control(field.value));
      this.fgMvt.get(field.label)?.setValidators([Validators.required,])
    });
    this.fgMvt.get('CoutRation')?.disable()
    this.fgMvt.get('QteStock')?.disable()
  }

  initSubscriptions(id:string|null): void {
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
    this.paramsService.paramsSubj$
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
    if (id) {
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
            this.mvtCalled = this.fp.deepCopy(mvt)
            this.mvt = mvt
            this.displayForm()
          },
          error: (e) => {
            if (e !== 'Not Found') {
              console.error('one-sortie.getMvt', e);
            }
          }
        }); // fin subscribe
    } // fin getMvt

    // route data est alimenté par le resolver url avant ouverure
    this.route.data
      .subscribe(x => {
        this.camps = x['camps']
      })
  } // fin de initSubscriptions

  initSubscriptForm(): void {
    Object.keys(this.fgMvt.controls).forEach((controlName) => {
      this.fgMvt.controls[controlName].valueChanges.subscribe(() => this.onFormChanged());
    });  
    //this.fgMvt.controls['Vers'].valueChanges.subscribe(() => this.onFormChanged());        
  }

  displayForm(): void {
    this.mvtService.calcMvtAvant(this.mvt);
    this.formLoaded = false;
    this.formLoaded = this.mvtService.mvtToForm(this.mvt, this.fgMvt);
    this.mvtOld = this.fp.deepCopy(this.mvt)
    this.ajustShows()
  }

  ajustShows(): void {
    if (this.mvt.origine == 'camp') {
      this.showCamp = true;
      this.showService = false
      this.mvt.analytique ?? this.params.camp //si null, affecte une valeur par défaut
      } else {
      this.showCamp = false,
      this.showService = true
    }
  }
  
  onFormChanged(): void {
    if (!this.formLoaded) return // Wait until the form is loaded
    this.formLoaded = false
    this.formLoaded = this.mvtService.formToMvt(this.fgMvt, this.mvt);
    const _mvt =  this.fp.deepCopy(this.mvt)
    const _mvtold = this.mvtOld ?? this.fp.deepCopy(_mvt);
    if (!this.fp.deepEqual(_mvtold, _mvt)) {
      // une saisie a modifié mvt, mise à jour de présentation
      this.displayForm()
    } 
  }
  
  onArticle(article: Article): void {
    // l'appel d'article a été fait par article-search
    const byeCalled = (this.mvtOld.article.id == this.mvtCalled.article.id)
    const helloCalled = (article.id == this.mvtCalled.article.id)
    this.mvt.article = article
    if (article.id != this.mvtCalled.article.id) {           
      // enlève la quantité du mouvement dans le nouveau stock article
      this.mvt.article.qte_stock = this.mvt.article.qte_stock? this.mvt.article.qte_stock += this.mvt.qte_mouvement : 0
      if (byeCalled) { 
        // conserve les modifs non validées de l'ancien mouvement
        this.mvtCalled.rations = this.mvt.rations
        this.mvtCalled.qte_mouvement = this.mvt.qte_mouvement
        this.mvtCalled.prix_unit = this.mvt.prix_unit
        this.mvtCalled.article.qte_stock = this.mvt.article.qte_stock
      }
      // actualisation liée à un nouvel article pour ce mouvement
      this.mvt.rations = this.mvt.article.rations // reprendra la répartition par défaut
      this.mvt.prix_unit = 0 
    } else {
      // corrige de la différence de qte si on retrouve l'article initial
      const qtemvt = this.mvtCalled.qte_mouvement - this.mvt.qte_mouvement
      this.mvt.article.qte_stock? this.mvt.article.qte_stock -= qtemvt : 0
      if (helloCalled) { // remet les éléments modiiés de l'article initial 
        this.mvt.rations = this.mvtCalled.rations
        this.mvt.qte_mouvement = this.mvtCalled.qte_mouvement
        this.mvt.prix_unit = this.mvtCalled.prix_unit
        this.mvt.article.qte_stock = this.mvtCalled.article.qte_stock
      }
    }
    this.displayForm()
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

  save(): void {
    if (this.id ) {
      //this.mvtService.putMvt(this.id.toString())
      this.mvtService.putMvt(this.id, this.mvt).subscribe({
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

