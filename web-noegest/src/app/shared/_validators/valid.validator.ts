import { AbstractControl, ValidationErrors,  ValidatorFn } from "@angular/forms";

export function tabooValidator(taboo:string|null): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value === null || ctrl.value.length === 0 ) {
      return null
    }
    // exemple simple pour test d'un mot tabou, 'ne doit pas contenir'
    if (!ctrl.value.toUpperCase().includes(taboo?.toUpperCase())) {
        // valide
        return null;
    } else {
      //invalide
      return { tabooValidator: ctrl.value } ;
    }
  } 
}

export function passwordValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value === null) {
      return {passwordValidator: ctrl.value}
    }
    const hasNumber = /\d/.test(ctrl.value);
    const hasUpper = /[A-Z]/.test(ctrl.value);
    const hasLower = /[a-z]/.test(ctrl.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower;
    if (valid) {
      console.log('valid password',null)
      return null;
    } else {
      console.log('invalid password',ctrl.value)
      return { passwordValidator: ctrl.value };
    }
  } 
}

