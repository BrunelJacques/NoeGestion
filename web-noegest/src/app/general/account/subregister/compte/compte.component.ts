import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { confirmEqualValidator } from 'src/app/shared/_validators/confirm-equal.validator';
import { validValidator } from 'src/app/shared/_validators/valid.validator';
import { User } from 'src/app/general/_models';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html'
})
export class CompteComponent implements OnInit {

  userValue!: User
  userForm!: FormGroup
  isDisabled = true
  
  personalInfoForm!: FormGroup
  situationCtrl!: FormControl
  phoneCtrl!: FormControl
  usernameCtrl!: FormControl

  emailForm!: FormGroup
  emailCtrl!: FormControl
  confirmEmailCtrl!: FormControl
  
  loginInfoForm!: FormGroup
  passwordCtrl!: FormControl
  confirmPasswordCtrl!: FormControl 

  situationCtrl$!: Observable<string>
  showPhoneCtrl$!: Observable<boolean>
  showEmailError$!: Observable<boolean>
  showPasswordError$!: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initFormControls()
    this.initMainForm()
    this.setEmailValidators(true)
    this.initFormObservables()
    if (this.isDisabled) {
      this.setCtrlDisabled()
    }
  }

  private setCtrlDisabled() {
    this.personalInfoForm.get('firstName')?.disable()
    this.personalInfoForm.get('lastName')?.disable()
    this.loginInfoForm.get('username')?.disable()
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
  
  private initFormObservables() {
    this.situationCtrl$ = this.situationCtrl.valueChanges.pipe(
        startWith(this.situationCtrl.value),
        map(situation => situation),
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

  private initMainForm(): void {
    this.userForm = this.formBuilder.group({
      situation: this.situationCtrl,
      personalInfo: this.personalInfoForm,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    })
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['monprénom', Validators.required],
      lastName: ["", Validators.required],
    }),

    this.situationCtrl = this.formBuilder.control('info')
    this.emailCtrl = this.formBuilder.control('')
    this.confirmEmailCtrl = this.formBuilder.control('')

    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      // updateOn détermine la fréquence de l'action, blur c'est quand on sort du groupe
      updateOn: 'blur'
    });

    this.phoneCtrl = this.formBuilder.control('')
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

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Obligatoire'
    } else if (ctrl.hasError('email')) {
      return "Mail invalide"
    } else if (ctrl.hasError('minlength')) {
      return "Trop court"
    } else if (ctrl.hasError('maxlength')) {
      return "Trop long"
    } else {
      return "Saisie non valide"
    }
  }

}
