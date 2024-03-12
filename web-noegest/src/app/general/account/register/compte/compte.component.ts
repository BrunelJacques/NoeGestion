
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, distinctUntilChanged, map, tap } from 'rxjs';
import { confirmEqualValidator } from 'src/app/shared/_validators/confirm-equal.validator';
import { tabooValidator }    from 'src/app/shared/_validators/valid.validator';
import { passwordValidator } from 'src/app/shared/_validators/valid.validator';
import { User } from 'src/app/general/_models';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html'
})
export class CompteComponent implements OnInit {

  @Input() user!: User;
  @Output() valid = new EventEmitter<{value:boolean,user:User}>();

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
    if (this.user.username) {
      this.setUser(this.user)
    }
    this.initObservables()
    this.validerChampsRequis() 
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['',tabooValidator('test')],
      lastName: ['', Validators.required]
    }),

    this.phoneCtrl = this.formBuilder.control(null);
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
   
    this.emailForm = this.formBuilder.group({
      phone: this.phoneCtrl,
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      // updateOn détermine la fréquence de l'action, blur c'est quand on sort du groupe
      updateOn: 'blur'
    });

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

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      email: this.emailForm,
      loginInfo: this.loginInfoForm,
    })
  }

  private initObservables() {
    this.setEmailValidators()
    this.setPasswordValidators()
    
    this.showEmailError$ =  this.emailForm.statusChanges.pipe(
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
    );

    this.mainForm.statusChanges.pipe(
      distinctUntilChanged()).subscribe((status) => {
      if (status==='VALID') {
        this.valid.emit({value:true,user:this.getUser()});
      } else {
        this.valid.emit({value:false,user:this.user});
      }
      }
    );
  }

  private validerChampsRequis(): void {
    [this.emailForm.controls,].forEach(ctrl => {
      Object.keys(ctrl).forEach(key => {
        const control = this.mainForm.get(key);
        console.log('test: ', key, control)
        if (control) {
          control.updateValueAndValidity();
        } else {
          this.phoneCtrl.updateValueAndValidity()
          console.log("c'est null!!")
          console.log(this.phoneCtrl)
          console.log(this.emailForm)
      }
      });      
    });
  }

  private setEmailValidators(): void {
    this.phoneCtrl.addValidators([
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(16)])
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

  // convenience getter for easy access to form fields
  get fpi() { return this.personalInfoForm.controls}
  get fem() { return this.emailForm.controls}
  get fli() { return this.loginInfoForm.controls}

  private getUser():User {
    this.user.firstName = this.fpi['firstName'].value
    this.user.lastName = this.fpi['lastName'].value
    this.user.email = this.fem['email'].value
    this.user.phone = this.fem['phone'].value
    this.user.username = this.fli['username'].value
    this.user.password = this.fli['password'].value
    return this.user
  }

  private setUser(user:User){
    this.personalInfoForm.setValue({
      firstName:user.firstName,
      lastName:user.lastName
    }),
    this.mainForm.setValue({
      personalInfo: {
        firstName:user.firstName,
        lastName:user.lastName
      },
      email: {
        phone:"01",
        email:user.email,
        confirm:user.email,
      },
      loginInfo: {
        username:user.username,
        password:user.password,
        confirmPassword:user.password
      },
    })
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
  
  