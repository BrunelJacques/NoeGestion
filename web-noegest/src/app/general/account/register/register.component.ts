import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, first, map, startWith, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService } from 'src/app/general/_services';
import { User } from '../../_models';


@Component({ templateUrl: 'register.component.html' })

export class RegisterComponent implements OnInit {

    valid = true
    loading = false  
    userFormValid = true
    userValue!: User
    situationCtrl!: FormControl
    situationCtrl$!: Observable<string>
  
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
      console.log('user: ',this.userValue)
    }

    private initSituationCtrl() {
      this.situationCtrl = this.formBuilder.control('info')
    }

    private initObservables() {
      this.authenticationService.user$.pipe(
        take(1),
        map(x => this.userValue = x)
      )
      this.situationCtrl$ = this.situationCtrl.valueChanges.pipe(
        startWith(this.situationCtrl.value),
        map(x => x)
      )
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
                        this.alertService.success('Votre mot de passe vous sera envoyé par mail après vérification', { keepAfterRouteChange: true });
                        this.router.navigate(['../login'], { relativeTo: this.route });
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
    }
          
}  