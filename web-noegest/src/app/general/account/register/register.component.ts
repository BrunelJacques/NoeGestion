﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from './../../_services';

@Component({ templateUrl: 'register.component.html' })

export class RegisterComponent implements OnInit {
    form!: UntypedFormGroup;
    loading = false;
    submitted = false;
    valid = false

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.initFormControls()
    }

    initFormControls(): void {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required,Validators.email]],
            password: ['', [
                Validators.required,
                this.passwordValidator(),
                Validators.minLength(6)
            ]],
            confirmPassword: ['', Validators.required]
        });
    }
    
    passwordValidator() {
        // pour exiger un longeur mini de 6 avec les possibles [A-Za-z\d@$!%*?&]{6,}$   
        return Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+-_()])/);
      }
    
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.form.value)
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