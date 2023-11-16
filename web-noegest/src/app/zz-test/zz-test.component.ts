import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, first, map, startWith, tap } from 'rxjs';
import { validValidator } from '../shared/_validators/valid.validator';
import { confirmEqualValidator } from '../shared/_validators/confirm-equal.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService } from '../general/_services';

@Component({
  selector: 'app-zz-test',
  templateUrl: './zz-test.component.html',
  styleUrls: ['./zz-test.component.scss']
})
export class ZzTestComponent implements OnInit {

  loading = false;
  
  mainForm!: FormGroup;

  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  usernameCtrl!: FormControl;

  emailForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  
  loginInfoForm!: FormGroup;
  actuelpwCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;  

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
    ) {}

    ngOnInit(): void {
      this.initFormControls();
      this.initMainForm();
      this.initFormObservables();
    }
  
    private initMainForm(): void {
      this.mainForm = this.formBuilder.group({
        personalInfo: this.personalInfoForm,
        contactPreference: this.contactPreferenceCtrl,
        email: this.emailForm,
        phone: this.phoneCtrl,
        loginInfo: this.loginInfoForm,
      })
    }
  
    private initFormControls(): void {
      this.personalInfoForm = this.formBuilder.group({
        firstName: ['',validValidator()],
        lastName: ["", Validators.required]
      }),
  
      this.contactPreferenceCtrl = this.formBuilder.control('email');
      this.emailCtrl = this.formBuilder.control('');
      this.confirmEmailCtrl = this.formBuilder.control('');
  
      
      this.emailForm = this.formBuilder.group({
        email: this.emailCtrl,
        confirm: this.confirmEmailCtrl
      }, {
        validators: [confirmEqualValidator('email', 'confirm')],
        // updateOn détermine la fréquence de l'action, blur c'est quand on sort du groupe
        updateOn: 'blur'
      });
  
      this.phoneCtrl = this.formBuilder.control('');
      this.passwordCtrl = this.formBuilder.control('', Validators.required)
      this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required)
      this.usernameCtrl = this.formBuilder.control('', Validators.required)
      this.actuelpwCtrl = this.formBuilder.control('')
      
      this.loginInfoForm = this.formBuilder.group({
        username: this.usernameCtrl = this.formBuilder.control('', Validators.required),
        actuelpw: this.actuelpwCtrl,
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl,
      }, {
        validators: [confirmEqualValidator('password', 'confirmPassword')],
        updateOn: 'blur'
      });
    }
  
    private initFormObservables() {
      
      this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
          startWith(this.contactPreferenceCtrl.value),
          map(preference => preference === 'email'),
          tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl))
      );
      this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
          startWith(this.contactPreferenceCtrl.value),
          map(preference => preference === 'phone'),
          tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
      );
      this.showEmailError$ =  this.emailForm.statusChanges.pipe(
        map(status => status === 'INVALID' && 
          this.emailCtrl.value && 
          this.confirmEmailCtrl.value
        )
      );
  
      this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
        map(status => status === 'INVALID' && 
          this.passwordCtrl.value && 
          this.confirmPasswordCtrl.value
        )
      );
    }
  
    private setPhoneValidators(showPhoneCtrl: boolean): void {
            if (showPhoneCtrl) {
              // ajouter Validators
              this.phoneCtrl.addValidators([Validators.required, 
                Validators.minLength(10), 
                Validators.maxLength(16)])
            } else {
              this.phoneCtrl.clearValidators();
            }
            // ensuite pour réactualiser le contrôle de validité qui vient de changer
            this.phoneCtrl.updateValueAndValidity();
          }
  
    private setEmailValidators(showEmailCtrl: boolean): void {
      if (showEmailCtrl) {
          this.emailCtrl.addValidators([
              validValidator(),
              Validators.required,
              Validators.email]);
          this.confirmEmailCtrl.addValidators([
              Validators.required,
              Validators.email
          ]);
      } else {
          this.emailCtrl.clearValidators();
          this.confirmEmailCtrl.clearValidators();
      }
      this.emailCtrl.updateValueAndValidity();
      this.confirmEmailCtrl.updateValueAndValidity();
    }
  
    onSubmitForm(): void {
      this.loading = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.mainForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.register(this.mainForm.value)
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
  

    getFormControlErrorText(ctrl: AbstractControl) {
      if (ctrl.hasError('required')) {
        return 'Ce champ est obligatoire'
      } else if (ctrl.hasError('email')) {
        return "merci d'entrer un adresse valide"
      } else if (ctrl.hasError('minlength')) {
        return "Il n'y a pas assez de caracères"
      } else if (ctrl.hasError('maxlength')) {
        return "Trop long pour ce champ"
      } else if (ctrl.hasError('validValidator')){
          return ctrl.value + " contient le mot tabou VALID"
      } else {
        return "Saisie non valide"
      }
    }
  }
  
  