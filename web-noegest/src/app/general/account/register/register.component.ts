import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subject, first, map, startWith, take, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService } from 'src/app/general/_services';
import { User } from '../../_models';


@Component({ templateUrl: 'register.component.html' })

export class RegisterComponent implements OnInit, OnDestroy {

    loading = false  
    userFormValid = true
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
      ) {}
  
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
        tap( () =>  this.onIncoherence()),
        takeUntil(this.destroy$),
      ).subscribe()
    }

  onIncoherence(): void {
    this.alertService.clear()
    const log = this.isLogged
    const situ = this.situationCtrl.value
    if (!log && situ === 'exist') {
      const mess = "Si votre compte existe, il faut d'abord vous connecter avant d'y apporter des modifs"
      this.alertService.info(mess)
      this.situationCtrl.setValue('info')
    }
    if (log && situ === 'new') {
      const mess = "Votre compte existe, vous ne pouvez pas demander une nouvelle création de compte"
      this.alertService.info(mess)
      this.situationCtrl.setValue('info')
    }
  }

    ngOnDestroy(): void {
      this.destroy$.next(true)
    }

    onSubmitForm(): void {
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
                        this.router.navigate(['../login'], { relativeTo: this.route });
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
    }
          
}  