import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject, first, startWith, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService, SeeyouService } from 'src/app/general/_services';
import { User } from '../../_models';



@Component({ templateUrl: 'register.component.html' })

export class RegisterComponent implements OnInit, OnDestroy {
	loading = false  
	userFormValid = false
	userValue!: User
	situationCtrl!: FormControl
	destroy$!: Subject<boolean>
	isLogged!:boolean

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private seeyouService: SeeyouService,
    ){
      this.initSubscriptions()
    }
  
    initSubscriptions() {
      this.destroy$ = new Subject<boolean>()
  
      this.seeyouService.clicksOk$
        .pipe( takeUntil(this.destroy$))
        .subscribe(() => this.onSubmit());
      this.seeyouService.clicksQuit$
        .pipe( takeUntil(this.destroy$) )
        .subscribe(() => { this.onQuit() });    
    }
  
	ngOnInit(): void {
		this.initSituationCtrl()
		this.initObservables()
		this.alertService.clear()
	}

	private initSituationCtrl() {
		this.situationCtrl = this.formBuilder.control('info')
	}

	private initObservables() {
		this.destroy$ = new Subject<boolean>;

		this.userValue = new User
		this.authenticationService.user$.pipe(
			takeUntil(this.destroy$),
			tap(x => {
				this.isLogged = (x.username !== undefined),
				this.userValue = x
			}),
		).subscribe()

		this.situationCtrl.valueChanges.pipe(
			startWith(this.situationCtrl.value),
			tap( () => { 
				this.testCoherenceSituation(),
				this.userValue.situation = this.situationCtrl.value
			}),
			takeUntil(this.destroy$),
		).subscribe()


	}

	testCoherenceSituation(): void {
		const log = this.isLogged
		const situ = this.situationCtrl.value
		if (!log && situ === 'exist') {
			this.alertService.clear()
			const mess = "Si votre compte existe, il faut d'abord vous connecter avant d'y apporter des modifs"
			this.alertService.info(mess)
			this.situationCtrl.setValue('info')
		} else if (log && situ === 'new') {
			this.alertService.clear()
			const mess = "Votre compte existe, vous ne pouvez pas demander une nouvelle création de compte"
			this.alertService.info(mess)
			this.situationCtrl.setValue('info')
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	onValid(valid: User) {
		if (!valid) { this.userFormValid = false } 
		else { this.userFormValid = true }
		this.onSubmit()
	}

	onSubmit(): void {
		this.loading = true;

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (!this.userFormValid) {
				return;
		}

		this.loading = true;
		this.authenticationService.register(this.userValue)
			.pipe(first())
			.subscribe({
					next: () => {
							this.alertService.success('Votre demande sera analysée dans quelques jours', { keepAfterRouteChange: true });
							this.router.navigate(['/account/login'], { relativeTo: this.route });
					},
					error: error => {
							this.alertService.error(error);
							this.loading = false;
					}
			});
		this.onQuit()
	}

	onQuit(): void {
    this.seeyouService.goBack()
  }
	
}  