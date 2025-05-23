﻿import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, first, startWith, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertService, AuthenticationService, SeeyouService } from '../../_services';
import { User } from '../../_models';
import { MatCardModule } from '@angular/material/card';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CompteComponent } from './compte/compte.component';
import { InfoComponent } from './info/info.component';



@Component({ 
	imports: [MatCardModule, MatRadioButton, CommonModule, MatRadioGroup, MatIcon, 
		ReactiveFormsModule, CompteComponent, InfoComponent, RouterLink],
	templateUrl: 'register.component.html' 
})

export class RegisterComponent implements OnInit, OnDestroy {
	loading = false  
	userFormValid = false
	user!: User
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

		this.user = new User
		this.authenticationService.user$.pipe(
			takeUntil(this.destroy$),
			tap(x => {
				this.isLogged = (x.username !== undefined);
				this.user = x
			}),
		).subscribe()

		this.situationCtrl.valueChanges.pipe(
			startWith(this.situationCtrl.value),
			tap( () => { 
				this.testCoherenceSituation();
				this.user.situation = this.situationCtrl.value
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
		} else if (log && situ === 'exist') {
			console.log('gestion register exists')
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

	onValid(valid: {value: boolean, user:User}) {
		if (!valid.value) { this.userFormValid = false } 
		else { this.userFormValid = true;
			console.log('user', valid.user) }
		//this.onSubmit()
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
		this.authenticationService.register(this.user)
			.pipe(first())
			.subscribe({
					next: () => {
							this.alertService.success('Votre demande sera analysée dans quelques jours', { keepAfterRouteChange: true });
							this.router.navigate(['/login'], { relativeTo: this.route });
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