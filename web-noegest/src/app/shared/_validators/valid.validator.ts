import { AbstractControl, ValidationErrors,  ValidatorFn } from "@angular/forms";
import { FormControl } from "@angular/forms";

export function validValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value === null) {
      return {validValidator: ctrl.value}
    }
    // exemple simple pour test d'un mot tabou, 'ne doit pas contenir'
    if (!ctrl.value.toUpperCase().includes('PROVISOIRE')) {
        return null;
    } else {
      return { validValidator: ctrl.value } ;
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
    if (!valid) {
      return null;
    } else {
      return {
        passwordValidator: ctrl.value
      };
    }
  } 
}


export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {

  public static strong(control: FormControl): ValidationResult|null {
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
        // return what´s not valid
        return { strong: true };
    }
    return null;
}
}
