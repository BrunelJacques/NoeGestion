
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { confirmEqualValidator } from 'src/app/shared/_validators/confirm-equal.validator';
import { tabooValidator }    from 'src/app/shared/_validators/valid.validator';
import { passwordValidator } from 'src/app/shared/_validators/valid.validator';
import { User } from 'src/app/general/_models';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html'
})
export class CompteComponent implements OnInit {

  @Input() userValue!: User;
  @Output() valid = new EventEmitter<User>();

  mainForm!: FormGroup
  personalInfoForm!: FormGroup;
  phoneCtrl!: FormControl;

  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  showEmailError$!: Observable<boolean>;

  passwordCtrl!: FormControl
  confirmPasswordCtrl!: FormControl
  loginInfoForm!: FormGroup;
  showPasswordError$!: Observable<boolean>;

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
      firstName: ['',tabooValidator('test')],
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

    this.passwordCtrl = this.formBuilder.control('' )
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required)
    
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
  }

  initObservables() {
    this.setEmailValidators()
    this.setPhoneValidators()
    this.setPasswordValidators()
    
    this.showEmailError$ =  this.emailForm.statusChanges.pipe(
      tap((status: string) => console.log(status === 'INVALID', 
        this.emailCtrl.value ===
        this.confirmEmailCtrl.value)
      ),
      map(status => 
        this.emailCtrl.value !== this.confirmEmailCtrl.value &&
        status === 'INVALID' && 
        this.emailCtrl.value && 
        this.confirmEmailCtrl.value
      )
    );

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => 
          this.passwordCtrl.value !== this.confirmPasswordCtrl.value &&
          status === 'INVALID' && 
          this.passwordCtrl.value && 
          this.confirmPasswordCtrl.value
      )
    )
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
    this.confirmPasswordCtrl.addValidators([
      Validators.required,
    ]);
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est obligatoire'
    } else if (ctrl.hasError('passwordValidator')) {
      const err = ctrl.getError('passwordValidator')
      return err
    }
    
    {return "Saisie non valide"}
  }

}
  
  