import { AbstractControl, ValidationErrors,  ValidatorFn } from "@angular/forms";

export function validValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value === null) {
      return {validValidator: ctrl.value}
    }
    // exemple simple pour test d'un mot tabou, 'ne doit pas contenir'
    if (!ctrl.value.toUpperCase().includes('PROVISOIRE')) {
      return null;
    } else {
      return {
        validValidator: ctrl.value
      };
    }
  } 
}