/* eslint-disable @typescript-eslint/ban-types */
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmEqualValidator } from '../shared/_validators/confirm-equal.validator';
import { User } from '../general/_models';
import { validValidator } from '../shared/_validators/valid.validator';


@Component({
  selector: 'app-zz-test',
  templateUrl: './zz-test.component.html',
  styleUrls: ['./zz-test.component.scss']
})
export class ZzTestComponent implements OnInit, AfterViewInit {

  @Input() userValue!: User;
  
  mainForm!: FormGroup
  personalInfoForm!: FormGroup;
  phoneCtrl!: FormControl;
  usernameCtrl!: FormControl;

  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  showEmailError$!: Observable<Boolean>;

  passwordCtrl!: FormControl
  confirmPasswordCtrl!: FormControl
  loginInfoForm!: FormGroup;
  showPasswordError$!: Observable<Boolean>;

  constructor (
    private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm()
    this.initObservables()
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
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
    
    this.loginInfoForm = this.formBuilder.group({
      username: this.usernameCtrl = this.formBuilder.control('', Validators.required),
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit zztest")
  }

  initObservables() {
    this.setEmailValidators()
    this.setPhoneValidators()
    
    this.showEmailError$ =  this.emailForm.statusChanges.pipe(
      tap((status: string) => console.log(status === 'INVALID', 
        this.emailCtrl.value ===
        this.confirmEmailCtrl.value)
      ),
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

  private setPhoneValidators(): void {
    // ajouter Validators
    this.phoneCtrl.addValidators([Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(16)])
    // ensuite pour réactualiser le contrôle de validité qui vient de changer
    this.phoneCtrl.updateValueAndValidity();
  }


  private setEmailValidators(): void {
    this.emailCtrl.addValidators([
        validValidator(),
        Validators.required,
        Validators.email]);
    this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email
    ]);
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est obligatoire'
    } else {return "Saisie non valide"}
  }

}
  
  