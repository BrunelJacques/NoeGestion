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

  situation!: string | undefined  
  showEmailError$!: Observable<boolean>
  showPasswordError$!: Observable<boolean>

  mainForm!: FormGroup

  firstNameCtrl!: FormControl
  lastNameCtrl!: FormControl
  phoneCtrl!: FormControl
  emailCtrl!: FormControl
  confirmEmailCtrl!: FormControl
  usernameCtrl!: FormControl
  passwordCtrl!: FormControl
  confirmPasswordCtrl!: FormControl

  constructor(
    private formBuilder: FormBuilder,
    ) {}

  ngOnInit(): void {
    this.situation = this.userValue.situation
    if (this.situation === 'exists') { this.setCtrlDisabled}
    this.initFormControls()
    //this.initMainForm()
    this.setValidators()
    this.initFormObservables()
    if (this.situation === 'exist') {
      this.setCtrlDisabled()
    }
  }

  private setCtrlDisabled() {
    // l'option 'exist' grise certains controls non modifiables
    this.mainForm.get('firstName')?.disable()
    this.mainForm.get('lastName')?.disable()
    this.mainForm.get('username')?.disable()
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

    this.showEmailError$ =  this.mainForm.statusChanges.pipe(
        map(status => status === 'INVALID' && 
        this.emailCtrl.value && 
        this.confirmEmailCtrl.value
        )
    );

    this.showPasswordError$ = this.mainForm.statusChanges.pipe(
        map(status => status === 'INVALID' && 
        this.passwordCtrl.value && 
        this.confirmPasswordCtrl.value
        )
    );

    this.mainForm.statusChanges.pipe(
      map(status => {
        this.emitValid(status === 'VALID')
        }
      )
    ).subscribe()
  }

  private initFormControls(): void {

    this.firstNameCtrl = this.formBuilder.control(this.userValue.firstName, Validators.required)
    this.lastNameCtrl = this.formBuilder.control(this.userValue.lastName, Validators.required)
    this.phoneCtrl = this.formBuilder.control(this.userValue.phone)
    this.emailCtrl = this.formBuilder.control(this.userValue.email, Validators.required)
    this.confirmEmailCtrl = this.formBuilder.control(this.userValue.email, Validators.required)  
    this.usernameCtrl = this.formBuilder.control(this.userValue.username, [ Validators.minLength(5), Validators.required ])
    this.passwordCtrl = this.formBuilder.control(this.userValue.password, Validators.required)
    this.confirmPasswordCtrl = this.formBuilder.control(this.userValue.password, Validators.required)
    this.mainForm = this.formBuilder.group({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      phone: this.phoneCtrl,
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [
        confirmEqualValidator('email', 'confirm'),
        confirmEqualValidator('password', 'confirmPassword')
      ],
      updateOn: 'blur'// fréquence de l'action validation, blur c'est quand on sort du groupe
    });

  }
     
  private emitValid(ok: boolean): void {
    if (ok) {

      this.valid.emit({...this.userValue, ...this.getFormsValues()})
    } else {
      this.valid.emit(undefined)
    }
  }

  private getFormsValues(){
    return this.mainForm.value
  }
  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) { return 'Obligatoire'} 
    else if (ctrl.hasError('email')) { return "Mail invalide"} 
    else if (ctrl.hasError('minlength')) { return "Trop court"} 
    else if (ctrl.hasError('maxlength')) { return "Trop long"} 
    else { return "Saisie non valide"}
  }

}
