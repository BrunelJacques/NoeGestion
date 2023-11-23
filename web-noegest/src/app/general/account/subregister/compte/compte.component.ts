import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { confirmEqualValidator } from 'src/app/shared/_validators/confirm-equal.validator';
import { validValidator } from 'src/app/shared/_validators/valid.validator';
import { User } from 'src/app/general/_models';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html'
})
export class CompteComponent implements OnInit {

  @Input() userValue!: User;
  @Output() valid = new EventEmitter<User>();

  isDisabled = true
  situation!: string | undefined  
  showEmailError$!: Observable<boolean>
  showPasswordError$!: Observable<boolean>

  userForm!: FormGroup

  personalInfoForm!: FormGroup

  joinForm!: FormGroup
  phoneCtrl!: FormControl
  emailCtrl!: FormControl
  confirmEmailCtrl!: FormControl
  
  loginInfoForm!: FormGroup
  usernameCtrl!: FormControl
  passwordCtrl!: FormControl
  confirmPasswordCtrl!: FormControl 


  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.situation = this.userValue.situation
    this.initFormControls()
    this.initMainForm()
    this.setValidators()
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

  private setValidators(): void {
    this.emailCtrl.addValidators([
      validValidator(),
      Validators.required,
      Validators.email]);
    this.emailCtrl.updateValueAndValidity();

    this.confirmEmailCtrl.addValidators([
      Validators.required,
      Validators.email]);
    this.confirmEmailCtrl.updateValueAndValidity();

    this.phoneCtrl.addValidators([
      Validators.minLength(10), 
      Validators.maxLength(16)]);
    this.phoneCtrl.updateValueAndValidity();
  }

  private initFormObservables() {

    this.showEmailError$ =  this.joinForm.statusChanges.pipe(
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
      personalInfo: this.personalInfoForm,
      join: this.joinForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    })
  }

  private initFormControls(): void {

    this.personalInfoForm = this.formBuilder.group({
      firstName: [this.userValue.firstName, Validators.required],
      lastName: [this.userValue.lastName, Validators.required],
    }),

    this.phoneCtrl = this.formBuilder.control(this.userValue.phone)
    this.emailCtrl = this.formBuilder.control(this.userValue.email)
    this.confirmEmailCtrl = this.formBuilder.control(this.userValue.email)

    this.joinForm = this.formBuilder.group({
      phone: this.phoneCtrl,
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'// fréquence de l'action validation, blur c'est quand on sort du groupe
    });


    this.usernameCtrl = this.formBuilder.control(this.userValue.username, [ Validators.minLength(5), Validators.required ])
    this.passwordCtrl = this.formBuilder.control(this.userValue.password, Validators.required)
    this.confirmPasswordCtrl = this.formBuilder.control(this.userValue.password, Validators.required)
    
    this.loginInfoForm = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
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
