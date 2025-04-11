/* eslint-disable @typescript-eslint/ban-types */
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmEqualValidator } from '../shared/_validators/confirm-equal.validator';
import { User } from '../general/_models';
import { passwordValidator } from '../shared/_validators/valid.validator';
import { tabooValidator } from '../shared/_validators/valid.validator';

@Component({
    selector: 'app-zz-test',
    templateUrl: './zz-test.component.html',
    styleUrls: ['./zz-test.component.scss'],
    
})
export class ZzTestComponent implements OnInit, AfterViewInit {

  @Input() userValue!: User;

  mainForm!: FormGroup
  personalInfoForm!: FormGroup;
  usernameCtrl!: FormControl;

  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  showEmailError$!: Observable<Boolean>;

  passwordCtrl!: FormControl
  confirmPasswordCtrl!: FormControl
  loginInfoForm!: FormGroup;
  showPasswordError$!: Observable<Boolean>;

  passwordError!: string;

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
      emailInfo: this.emailForm,
      loginInfo: this.loginInfoForm,
    })
  }

  private initFormControls(): void {
//------------------------------------
    this.myTxtCtrl = this.formBuilder.control('invite',Validators.required)
    this.myDateCtrl = this.formBuilder.control('',Validators.required)
    this.mainForm = this.formBuilder.group({
      myTxt: this.myTxtCtrl,
      myDate: this.myDateCtrl
    })
//------------------------------------

    this.personalInfoForm = this.formBuilder.group({
      firstName: [''],
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
    
    this.passwordCtrl = this.formBuilder.control('');
    this.confirmPasswordCtrl = this.formBuilder.control('');
    this.usernameCtrl = this.formBuilder.control('', Validators.required)
    
    this.loginInfoForm = this.formBuilder.group({
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
    this.setPasswordValidators()
    
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


  private setEmailValidators(): void {
    this.emailCtrl.addValidators([
        tabooValidator('provisoire'),
        Validators.required,
        Validators.email]);
    this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email
    ]);
  }

  private setPasswordValidators(): void {
    this.passwordCtrl.addValidators([
        passwordValidator(),
        Validators.required,
        ]);
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est obligatoire'
    } else {return "Saisie non valide"}
  }

  onRetour(param: unknown) {
    console.log(param)
  }
//---------------------------------
myTxtCtrl!: FormControl;
myDateCtrl!: FormControl;

//---------------------------------
}
  
  